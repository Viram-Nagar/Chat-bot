import { create } from "zustand";
import { chatService } from "../services/chatService";
import {
  sendMessageSocket,
  isSocketConnected,
} from "../services/socketService";

export const useChatStore = create((set, get) => ({
  // ─── State ───────────────────────────────────────────────────
  messages: [],
  conversations: [],
  currentConversationId: null,
  currentBotType: null,
  isTyping: false,
  isStreaming: false, // NEW
  streamingMessageId: null, // NEW
  isLoading: false,
  isSidebarOpen: true,
  totalConversations: 0,

  // ─── Set bot ─────────────────────────────────────────────────
  setCurrentBot: (botType) => {
    set({
      currentBotType: botType,
      currentConversationId: null,
      messages: [],
      isStreaming: false,
      streamingMessageId: null,
    });
  },

  // ─── New chat ─────────────────────────────────────────────────
  startNewChat: () => {
    set({
      currentConversationId: null,
      messages: [],
      isStreaming: false,
      streamingMessageId: null,
    });
  },

  // ─── Send message (socket-first, HTTP fallback) ──────────────
  sendMessage: async (message) => {
    const { currentBotType, currentConversationId } = get();
    if (!currentBotType || !message.trim()) return;

    // Optimistic user message
    const tempId = `temp-user-${Date.now()}`;
    const tempUserMsg = {
      _id: tempId,
      role: "user",
      content: message.trim(),
      createdAt: new Date().toISOString(),
      isTemp: true,
    };

    set((state) => ({
      messages: [...state.messages, tempUserMsg],
      isTyping: true,
    }));

    // ── Try socket first ────────────────────────────────────
    const socketSent = sendMessageSocket({
      botType: currentBotType,
      conversationId: currentConversationId || undefined,
      message: message.trim(),
    });

    if (socketSent) {
      // Socket will handle the rest via event listeners
      // (see setupSocketListeners in ChatPage)
      return { success: true, method: "socket" };
    }

    // ── HTTP fallback ───────────────────────────────────────
    console.warn("⚠️ Socket not connected — falling back to HTTP");
    try {
      const res = await chatService.sendMessage({
        botType: currentBotType,
        conversationId: currentConversationId,
        message: message.trim(),
      });

      set((state) => ({
        messages: [
          ...state.messages.filter((m) => m._id !== tempId),
          res.userMessage,
          res.aiMessage,
        ],
        currentConversationId: res.conversationId,
        isTyping: false,
      }));

      get().loadConversations();
      return { success: true, method: "http" };
    } catch (error) {
      set((state) => ({
        messages: state.messages.filter((m) => m._id !== tempId),
        isTyping: false,
      }));
      return { success: false, message: error.message };
    }
  },

  // ─── Socket event handlers ────────────────────────────────────

  // Called when user message is confirmed saved
  onMessageSaved: ({ conversationId, userMessage }) => {
    set((state) => ({
      messages: [...state.messages.filter((m) => !m.isTemp), userMessage],
      currentConversationId: conversationId,
    }));
  },

  // Called when AI starts typing
  onAiTypingStart: ({ conversationId }) => {
    // Add placeholder streaming message
    const streamingPlaceholder = {
      _id: `streaming-${Date.now()}`,
      role: "assistant",
      content: "",
      createdAt: new Date().toISOString(),
      isStreaming: true,
    };

    set({
      isTyping: false,
      isStreaming: true,
      streamingMessageId: streamingPlaceholder._id,
      messages: [...get().messages, streamingPlaceholder],
    });
  },

  // Called on each streamed chunk
  onAiChunk: ({ chunk, messageId }) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.isStreaming ? { ...msg, content: msg.content + chunk } : msg,
      ),
    }));
  },

  // Called when streaming is complete
  onAiDone: ({ fullContent, messageId, createdAt, conversationId }) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.isStreaming
          ? {
              ...msg,
              _id: messageId,
              content: fullContent,
              createdAt,
              isStreaming: false,
            }
          : msg,
      ),
      isStreaming: false,
      streamingMessageId: null,
      currentConversationId: conversationId,
    }));

    // Refresh sidebar
    get().loadConversations();
  },

  // Called on AI error during stream
  onAiError: ({ message, messageId }) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.isStreaming
          ? {
              ...msg,
              _id: messageId,
              content: message || "Something went wrong. Please try again.",
              isStreaming: false,
              isError: true,
            }
          : msg,
      ),
      isStreaming: false,
      streamingMessageId: null,
      isTyping: false,
    }));
  },

  // ─── Load conversation history ────────────────────────────────
  loadConversation: async (conversationId) => {
    set({ isLoading: true });
    try {
      const res = await chatService.getConversationById(conversationId);
      set({
        messages: res.messages,
        currentConversationId: conversationId,
        currentBotType: res.conversation.botType,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  // ─── Load all conversations ───────────────────────────────────
  loadConversations: async (params) => {
    try {
      const res = await chatService.getAllConversations(params);
      set({
        conversations: res.conversations,
        totalConversations: res.total,
      });
    } catch (_) {}
  },

  // ─── Delete conversation ──────────────────────────────────────
  deleteConversation: async (id) => {
    await chatService.deleteConversation(id);
    const { currentConversationId } = get();
    set((state) => ({
      conversations: state.conversations.filter((c) => c._id !== id),
      ...(currentConversationId === id && {
        currentConversationId: null,
        messages: [],
      }),
    }));
  },

  // ─── Clear all conversations ──────────────────────────────────
  clearAllConversations: async () => {
    await chatService.clearAllConversations();
    set({
      conversations: [],
      messages: [],
      currentConversationId: null,
      totalConversations: 0,
    });
  },

  // ─── Toggle sidebar ───────────────────────────────────────────
  toggleSidebar: () => {
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
  },

  // ─── Reset (called on logout) ─────────────────────────────────
  reset: () => {
    set({
      messages: [],
      conversations: [],
      currentConversationId: null,
      currentBotType: null,
      isTyping: false,
      isStreaming: false,
      streamingMessageId: null,
      isLoading: false,
    });
  },
}));

// import { create } from "zustand";
// import { chatService } from "../services/chatService";

// export const useChatStore = create((set, get) => ({
//   // ─── State ───────────────────────────────────────────────────
//   messages: [],
//   conversations: [],
//   currentConversationId: null,
//   currentBotType: null,
//   isTyping: false,
//   isLoading: false,
//   isSidebarOpen: true,
//   totalConversations: 0,

//   // ─── Set Current Bot ─────────────────────────────────────────
//   setCurrentBot: (botType) => {
//     set({
//       currentBotType: botType,
//       currentConversationId: null,
//       messages: [],
//     });
//   },

//   // ─── Start New Chat ──────────────────────────────────────────
//   startNewChat: () => {
//     set({
//       currentConversationId: null,
//       messages: [],
//     });
//   },

//   // ─── Send Message ────────────────────────────────────────────
//   sendMessage: async (message) => {
//     const { currentBotType, currentConversationId } = get();
//     if (!currentBotType || !message.trim()) return;

//     // Optimistic user message
//     const tempUserMsg = {
//       _id: `temp-${Date.now()}`,
//       role: "user",
//       content: message.trim(),
//       createdAt: new Date().toISOString(),
//       isTemp: true,
//     };

//     set((state) => ({
//       messages: [...state.messages, tempUserMsg],
//       isTyping: true,
//     }));

//     try {
//       const res = await chatService.sendMessage({
//         botType: currentBotType,
//         conversationId: currentConversationId,
//         message: message.trim(),
//       });

//       // Replace temp message + add AI response
//       set((state) => ({
//         messages: [
//           ...state.messages.filter((m) => !m.isTemp),
//           res.userMessage,
//           res.aiMessage,
//         ],
//         currentConversationId: res.conversationId,
//         isTyping: false,
//       }));

//       // Refresh sidebar conversations
//       get().loadConversations();

//       return { success: true };
//     } catch (error) {
//       // Remove temp message on error
//       set((state) => ({
//         messages: state.messages.filter((m) => !m.isTemp),
//         isTyping: false,
//       }));
//       return { success: false, message: error.message };
//     }
//   },

//   // ─── Load Conversation History ────────────────────────────────
//   loadConversation: async (conversationId) => {
//     set({ isLoading: true });
//     try {
//       const res = await chatService.getConversationById(conversationId);
//       set({
//         messages: res.messages,
//         currentConversationId: conversationId,
//         currentBotType: res.conversation.botType,
//         isLoading: false,
//       });
//     } catch (error) {
//       set({ isLoading: false });
//       throw error;
//     }
//   },

//   // ─── Load All Conversations (sidebar) ────────────────────────
//   loadConversations: async (params) => {
//     try {
//       const res = await chatService.getAllConversations(params);
//       set({
//         conversations: res.conversations,
//         totalConversations: res.total,
//       });
//     } catch (_) {}
//   },

//   // ─── Delete Conversation ─────────────────────────────────────
//   deleteConversation: async (id) => {
//     await chatService.deleteConversation(id);
//     const { currentConversationId } = get();

//     set((state) => ({
//       conversations: state.conversations.filter((c) => c._id !== id),
//       // Reset chat if deleting current
//       ...(currentConversationId === id && {
//         currentConversationId: null,
//         messages: [],
//       }),
//     }));
//   },

//   // ─── Clear All ───────────────────────────────────────────────
//   clearAllConversations: async () => {
//     await chatService.clearAllConversations();
//     set({
//       conversations: [],
//       messages: [],
//       currentConversationId: null,
//       totalConversations: 0,
//     });
//   },

//   // ─── Toggle Sidebar ──────────────────────────────────────────
//   toggleSidebar: () => {
//     set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
//   },

//   // ─── Reset ───────────────────────────────────────────────────
//   reset: () => {
//     set({
//       messages: [],
//       conversations: [],
//       currentConversationId: null,
//       currentBotType: null,
//       isTyping: false,
//       isLoading: false,
//     });
//   },
// }));
