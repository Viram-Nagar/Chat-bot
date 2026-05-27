require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const { validateEnv } = require("./config/env");
const connectDB = require("./config/db");
const app = require("./app");
const { setupSocketHandlers } = require("./socket/socketHandler");

// Validate env
validateEnv();

// Connect DB
connectDB();

const PORT = process.env.PORT || 5000;

// ─── Create HTTP server ─────────────────────────────────────────
const httpServer = http.createServer(app);

// ─── Attach Socket.io ───────────────────────────────────────────
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
  },
  pingTimeout: 60000,
  pingInterval: 25000,
});

// ─── Socket handlers ────────────────────────────────────────────
setupSocketHandlers(io);

// ─── Start server ───────────────────────────────────────────────
httpServer.listen(PORT, () => {
  console.log(
    `\n🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
  );
  console.log(`📡 API:    http://localhost:${PORT}/api`);
  console.log(`❤️  Health: http://localhost:${PORT}/api/health`);
  console.log(`🔌 Socket: ws://localhost:${PORT}\n`);
});

// ─── Graceful shutdown ──────────────────────────────────────────
process.on("unhandledRejection", (err) => {
  console.error("❌ UNHANDLED REJECTION:", err.name, err.message);
  httpServer.close(() => process.exit(1));
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM received. Shutting down gracefully...");
  httpServer.close(() => console.log("✅ Process terminated"));
});

// require("dotenv").config();
// const { validateEnv } = require("./config/env");
// const connectDB = require("./config/db");
// const app = require("./app");

// // Validate environment variables
// validateEnv();

// // Connect to MongoDB
// connectDB();

// const PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, () => {
//   console.log(
//     `\n🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
//   );
//   console.log(`📡 API URL: http://localhost:${PORT}/api`);
//   console.log(`❤️  Health: http://localhost:${PORT}/api/health\n`);
// });

// // Handle unhandled promise rejections
// process.on("unhandledRejection", (err) => {
//   console.error("❌ UNHANDLED REJECTION:", err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });

// // Handle SIGTERM
// process.on("SIGTERM", () => {
//   console.log("👋 SIGTERM received. Shutting down gracefully...");
//   server.close(() => {
//     console.log("✅ Process terminated");
//   });
// });
