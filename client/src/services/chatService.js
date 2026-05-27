import api from "./api";

export const chatService = {
  sendMessage: async ({ botType, conversationId, message }) => {
    const response = await api.post("/chat/send", {
      botType,
      conversationId: conversationId || undefined,
      message,
    });
    return response.data;
  },

  getAllConversations: async (params = {}) => {
    const response = await api.get("/history/conversations", { params });
    return response.data;
  },

  getConversationById: async (id) => {
    const response = await api.get(`/history/conversations/${id}`);
    return response.data;
  },

  deleteConversation: async (id) => {
    const response = await api.delete(`/history/conversations/${id}`);
    return response.data;
  },

  clearAllConversations: async () => {
    const response = await api.delete("/history/conversations");
    return response.data;
  },
};
