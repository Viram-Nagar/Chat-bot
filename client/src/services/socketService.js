import { io } from "socket.io-client";

// Uses env variable — works for both dev and prod
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

let socket = null;

export const connectSocket = (token) => {
  if (socket?.connected) return socket;

  socket = io(SOCKET_URL, {
    auth: { token },
    withCredentials: true,
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 20000,
  });

  socket.on("connect", () => {
    console.log("🔌 Socket connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.warn("⚠️ Socket connection error:", err.message);
  });

  socket.on("disconnect", (reason) => {
    console.log("🔌 Socket disconnected:", reason);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;

export const sendMessageSocket = (payload) => {
  if (!socket?.connected) return false;
  socket.emit("send_message", payload);
  return true;
};

export const joinConversation = (conversationId) => {
  if (!socket?.connected) return;
  socket.emit("join_conversation", conversationId);
};

export const leaveConversation = (conversationId) => {
  if (!socket?.connected) return;
  socket.emit("leave_conversation", conversationId);
};

export const isSocketConnected = () => socket?.connected || false;

// import { io } from "socket.io-client";

// const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

// let socket = null;

// // ─── Connect ────────────────────────────────────────────────────
// export const connectSocket = (token) => {
//   if (socket?.connected) return socket;

//   socket = io(SOCKET_URL, {
//     auth: { token },
//     withCredentials: true,
//     transports: ["websocket", "polling"],
//     reconnection: true,
//     reconnectionAttempts: 5,
//     reconnectionDelay: 1000,
//     timeout: 20000,
//   });

//   socket.on("connect", () => {
//     console.log("🔌 Socket connected:", socket.id);
//   });

//   socket.on("connect_error", (err) => {
//     console.error("❌ Socket connection error:", err.message);
//   });

//   socket.on("disconnect", (reason) => {
//     console.log("🔌 Socket disconnected:", reason);
//   });

//   return socket;
// };

// // ─── Disconnect ─────────────────────────────────────────────────
// export const disconnectSocket = () => {
//   if (socket) {
//     socket.disconnect();
//     socket = null;
//   }
// };

// // ─── Get instance ───────────────────────────────────────────────
// export const getSocket = () => socket;

// // ─── Emit helpers ───────────────────────────────────────────────
// export const sendMessageSocket = (payload) => {
//   if (!socket?.connected) return false;
//   socket.emit("send_message", payload);
//   return true;
// };

// export const joinConversation = (conversationId) => {
//   if (!socket?.connected) return;
//   socket.emit("join_conversation", conversationId);
// };

// export const leaveConversation = (conversationId) => {
//   if (!socket?.connected) return;
//   socket.emit("leave_conversation", conversationId);
// };

// // ─── Check connection ────────────────────────────────────────────
// export const isSocketConnected = () => socket?.connected || false;
