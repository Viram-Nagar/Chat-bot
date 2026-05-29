import { useEffect, useCallback, useRef } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  Link,
} from "react-router-dom";
import {
  ArrowLeft,
  LayoutDashboard,
  Plus,
  PanelLeftOpen,
  Wifi,
  WifiOff,
} from "lucide-react";
import { useChatStore } from "../store/chatStore";
import { getBotConfig } from "../utils/botConfig";
import { useAuthStore } from "../store/authStore";
import {
  getSocket,
  joinConversation,
  leaveConversation,
  isSocketConnected,
} from "../services/socketService";
import ConversationSidebar from "../components/chat/ConversationSidebar";
import ChatWindow from "../components/chat/ChatWindow";
import InputBar from "../components/chat/InputBar";
import toast from "react-hot-toast";
import { useBotSettingsStore } from "../store/botSettingsStore";
import { useState } from "react";

// ── Chat Header ──────────────────────────────────────────────────
// const ChatHeader = ({
//   bot,
//   isSidebarOpen,
//   toggleSidebar,
//   onNewChat,
//   isConnected,
// }) => (
//   <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex-shrink-0">
//     <div className="flex items-center gap-3">
//       <button
//         onClick={toggleSidebar}
//         className="lg:hidden p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
//       >
//         <PanelLeftOpen size={18} />
//       </button>

//       <Link
//         to="/dashboard"
//         className="hidden sm:flex items-center gap-1.5 p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
//       >
//         <ArrowLeft size={16} />
//       </Link>

//       {/* Bot info */}
//       <div className="flex items-center gap-3">
//         <div
//           className={`w-9 h-9 rounded-xl flex-shrink-0 bg-gradient-to-br ${bot?.gradient} flex items-center justify-center text-lg shadow-sm`}
//         >
//           {bot?.emoji}
//         </div>
//         <div>
//           <h1 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
//             {bot?.name}
//           </h1>
//           <p className={`text-xs ${bot?.text} font-medium`}>{bot?.tagline}</p>
//         </div>
//       </div>

//       {/* Connection status */}
//       <div
//         className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full ${isConnected ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"}`}
//       >
//         {isConnected ? (
//           <>
//             <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
//             <span className="text-xs font-medium text-green-600 dark:text-green-400">
//               Live
//             </span>
//           </>
//         ) : (
//           <>
//             <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
//             <span className="text-xs font-medium text-red-500 dark:text-red-400">
//               Offline
//             </span>
//           </>
//         )}
//       </div>
//     </div>

//     {/* Right */}
//     <div className="flex items-center gap-2">
//       <button
//         onClick={onNewChat}
//         className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all"
//       >
//         <Plus size={13} />
//         New Chat
//       </button>
//       <Link
//         to="/dashboard"
//         className="sm:hidden p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
//       >
//         <LayoutDashboard size={16} />
//       </Link>
//     </div>
//   </header>
// );

// ── Updated ChatHeader ───────────────────────────────────────────
const ChatHeader = ({
  bot,
  isSidebarOpen,
  toggleSidebar,
  onNewChat,
  isConnected,
}) => {
  const { getMergedBotConfig } = useBotSettingsStore(); // ← ADD
  const mergedBot = getMergedBotConfig(bot); // ← ADD

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex-shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
        >
          <PanelLeftOpen size={18} />
        </button>

        <Link
          to="/dashboard"
          className="hidden sm:flex items-center gap-1.5 p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
        >
          <ArrowLeft size={16} />
        </Link>

        {/* Bot info — uses custom name */}
        <div className="flex items-center gap-3">
          <div
            className={`
              w-9 h-9 rounded-xl flex-shrink-0
              bg-gradient-to-br ${mergedBot?.gradient}
              flex items-center justify-center text-lg shadow-sm
            `}
          >
            {mergedBot?.emoji}
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
              {mergedBot?.name} {/* ← custom name */}
            </h1>
            <p className={`text-xs ${mergedBot?.text} font-medium`}>
              {mergedBot?.tagline}
            </p>
          </div>
        </div>

        {/* Connection status */}
        <div
          className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
            isConnected
              ? "bg-green-50 dark:bg-green-900/20"
              : "bg-red-50 dark:bg-red-900/20"
          }`}
        >
          {isConnected ? (
            <>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-green-600 dark:text-green-400">
                Live
              </span>
            </>
          ) : (
            <>
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
              <span className="text-xs font-medium text-red-500 dark:text-red-400">
                Offline
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button
          onClick={onNewChat}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all"
        >
          <Plus size={13} />
          New Chat
        </button>
        <Link
          to="/dashboard"
          className="sm:hidden p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
        >
          <LayoutDashboard size={16} />
        </Link>
      </div>
    </header>
  );
};

// ── Main ChatPage ────────────────────────────────────────────────
const ChatPage = () => {
  const { botType } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const convId = searchParams.get("conv");
  const [isConnected, setIsConnected] = useState(isSocketConnected());
  const listenersRef = useRef(false);

  const {
    setCurrentBot,
    startNewChat,
    sendMessage,
    loadConversation,
    toggleSidebar,
    isSidebarOpen,
    isTyping,
    isStreaming,
    currentConversationId,
    onMessageSaved,
    onAiTypingStart,
    onAiChunk,
    onAiDone,
    onAiError,
  } = useChatStore();

  const { user } = useAuthStore();
  const bot = getBotConfig(botType);

  // ── Guard invalid bot ────────────────────────────────────────
  useEffect(() => {
    if (!bot) {
      navigate("/dashboard");
      return;
    }
    setCurrentBot(botType);
  }, [botType]);

  // ── Load conversation from URL ───────────────────────────────
  useEffect(() => {
    if (convId && bot) {
      loadConversation(convId).catch(() => {
        toast.error("Conversation not found");
        navigate(`/chat/${botType}`);
      });
    }
  }, [convId]);

  // ── Join socket room when conversation changes ───────────────
  useEffect(() => {
    if (currentConversationId) {
      joinConversation(currentConversationId);
    }
  }, [currentConversationId]);

  // ── Setup socket listeners ONCE ──────────────────────────────
  useEffect(() => {
    if (listenersRef.current) return;
    const socket = getSocket();
    if (!socket) return;

    listenersRef.current = true;

    // Connection state
    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    // Message flow
    socket.on("message_saved", onMessageSaved);
    socket.on("ai_typing_start", onAiTypingStart);
    socket.on("ai_chunk", onAiChunk);
    socket.on("ai_done", onAiDone);
    socket.on("ai_error", (data) => {
      onAiError(data);
      toast.error(data.message || "AI error occurred");
    });

    // Generic error
    socket.on("error", (data) => {
      toast.error(data.message || "Something went wrong");
    });

    // Cleanup on unmount
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message_saved");
      socket.off("ai_typing_start");
      socket.off("ai_chunk");
      socket.off("ai_done");
      socket.off("ai_error");
      socket.off("error");
      listenersRef.current = false;

      if (currentConversationId) {
        leaveConversation(currentConversationId);
      }
    };
  }, []);

  // ── Handlers ─────────────────────────────────────────────────
  const handleSend = useCallback(
    async (message) => {
      const result = await sendMessage(message);
      if (result && !result.success) {
        toast.error(result.message || "Failed to send message");
      }
    },
    [sendMessage],
  );

  const handleNewChat = useCallback(() => {
    startNewChat();
    navigate(`/chat/${botType}`);
  }, [botType]);

  if (!bot) return null;

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <div className="relative flex h-full">
        <ConversationSidebar botType={botType} />
      </div>

      {/* Main chat */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader
          bot={bot}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          onNewChat={handleNewChat}
          isConnected={isConnected}
        />

        <ChatWindow botType={botType} onSendMessage={handleSend} />

        <InputBar
          onSend={handleSend}
          isTyping={isTyping}
          isStreaming={isStreaming} // ← pass streaming
          botType={botType}
          disabled={false}
        />
      </div>
    </div>
  );
};

export default ChatPage;

// import { useEffect, useCallback } from "react";
// import {
//   useParams,
//   useSearchParams,
//   useNavigate,
//   Link,
// } from "react-router-dom";
// import { ArrowLeft, LayoutDashboard, Plus, PanelLeftOpen } from "lucide-react";
// import { useChatStore } from "../store/chatStore";
// import { getBotConfig } from "../utils/botConfig";
// import { useAuthStore } from "../store/authStore";
// import ConversationSidebar from "../components/chat/ConversationSidebar";
// import ChatWindow from "../components/chat/ChatWindow";
// import InputBar from "../components/chat/InputBar";
// import toast from "react-hot-toast";

// // ── Chat Header ──────────────────────────────────────────────────
// const ChatHeader = ({
//   bot,
//   currentConversationId,
//   isSidebarOpen,
//   toggleSidebar,
//   onNewChat,
//   user,
// }) => (
//   <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex-shrink-0">
//     <div className="flex items-center gap-3">
//       {/* Sidebar toggle (mobile) */}
//       <button
//         onClick={toggleSidebar}
//         className="lg:hidden p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
//       >
//         <PanelLeftOpen size={18} />
//       </button>

//       {/* Back to dashboard */}
//       <Link
//         to="/dashboard"
//         className="hidden sm:flex items-center gap-1.5 p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
//         title="Back to Dashboard"
//       >
//         <ArrowLeft size={16} />
//       </Link>

//       {/* Bot info */}
//       <div className="flex items-center gap-3">
//         <div
//           className={`
//             w-9 h-9 rounded-xl flex-shrink-0
//             bg-gradient-to-br ${bot?.gradient}
//             flex items-center justify-center text-lg shadow-sm
//           `}
//         >
//           {bot?.emoji}
//         </div>
//         <div>
//           <h1 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
//             {bot?.name}
//           </h1>
//           <p className={`text-xs ${bot?.text} font-medium`}>{bot?.tagline}</p>
//         </div>
//       </div>

//       {/* Active indicator */}
//       <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-green-50 dark:bg-green-900/20 rounded-full">
//         <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
//         <span className="text-xs font-medium text-green-600 dark:text-green-400">
//           Online
//         </span>
//       </div>
//     </div>

//     {/* Right actions */}
//     <div className="flex items-center gap-2">
//       {/* New chat */}
//       <button
//         onClick={onNewChat}
//         className="
//           flex items-center gap-1.5 px-3 py-1.5
//           text-xs font-semibold
//           border border-gray-200 dark:border-gray-700
//           text-gray-600 dark:text-gray-300
//           hover:bg-gray-50 dark:hover:bg-gray-800
//           rounded-xl transition-all
//         "
//       >
//         <Plus size={13} />
//         New Chat
//       </button>

//       {/* Dashboard link (mobile) */}
//       <Link
//         to="/dashboard"
//         className="
//           sm:hidden p-2 rounded-xl
//           text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
//           hover:bg-gray-100 dark:hover:bg-gray-800
//           transition-all
//         "
//       >
//         <LayoutDashboard size={16} />
//       </Link>
//     </div>
//   </header>
// );

// // ── Main ChatPage ────────────────────────────────────────────────
// const ChatPage = () => {
//   const { botType } = useParams();
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const convId = searchParams.get("conv");

//   const {
//     setCurrentBot,
//     startNewChat,
//     sendMessage,
//     loadConversation,
//     toggleSidebar,
//     isSidebarOpen,
//     isTyping,
//     currentConversationId,
//   } = useChatStore();

//   const { user } = useAuthStore();
//   const bot = getBotConfig(botType);

//   // ── Guard: invalid bot type ──────────────────────
//   useEffect(() => {
//     if (!bot) {
//       navigate("/dashboard");
//       return;
//     }
//     setCurrentBot(botType);
//   }, [botType]);

//   // ── Load conversation from URL param ────────────
//   useEffect(() => {
//     if (convId && bot) {
//       loadConversation(convId).catch(() => {
//         toast.error("Conversation not found");
//         navigate(`/chat/${botType}`);
//       });
//     }
//   }, [convId]);

//   // ── Send message handler ─────────────────────────
//   const handleSend = useCallback(
//     async (message) => {
//       const result = await sendMessage(message);
//       if (!result.success) {
//         toast.error(result.message || "Failed to send message");
//       }
//     },
//     [sendMessage],
//   );

//   // ── New chat handler ─────────────────────────────
//   const handleNewChat = useCallback(() => {
//     startNewChat();
//     navigate(`/chat/${botType}`);
//   }, [botType]);

//   if (!bot) return null;

//   return (
//     <div className="flex h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 overflow-hidden">
//       {/* ── Sidebar container ─────────────────────── */}
//       <div className="relative flex h-full">
//         <ConversationSidebar botType={botType} />
//       </div>

//       {/* ── Main chat area ────────────────────────── */}
//       <div className="flex-1 flex flex-col min-w-0 bg-gray-50 dark:bg-gray-850">
//         {/* Header */}
//         <ChatHeader
//           bot={bot}
//           currentConversationId={currentConversationId}
//           isSidebarOpen={isSidebarOpen}
//           toggleSidebar={toggleSidebar}
//           onNewChat={handleNewChat}
//           user={user}
//         />

//         {/* Messages */}
//         <ChatWindow botType={botType} onSendMessage={handleSend} />

//         {/* Input */}
//         <InputBar
//           onSend={handleSend}
//           isTyping={isTyping}
//           botType={botType}
//           disabled={false}
//         />
//       </div>
//     </div>
//   );
// };

// export default ChatPage;
