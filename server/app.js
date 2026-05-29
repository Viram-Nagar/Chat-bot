const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("./middleware/sanitize");
const xss = require("xss-clean"); // ← FIX 1
const { generalLimiter } = require("./middleware/rateLimiter");
const { errorHandler } = require("./middleware/errorHandler");

// Route imports
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const historyRoutes = require("./routes/historyRoutes");
const botSettingsRoutes = require("./routes/botSettingsRoutes");

const app = express();
app.set("trust proxy", 1);

// ─── Security Middleware ────────────────────────────────────────
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

// ─── CORS ───────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${origin}`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// ─── Body Parsers ───────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// ─── Data Sanitization ─────────────────────────────────────────
app.use(mongoSanitize);
// app.use(xss()); // ← FIX 1

// ─── Rate Limiting ─────────────────────────────────────────────
app.use("/api", generalLimiter);

// ─── Routes ────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/bot-settings", botSettingsRoutes);

// ─── Health Check ───────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Chatbot API is running",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ─── 404 Handler (Express 5 compatible) ────────────────────────  ← FIX 2
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ─── Global Error Handler ───────────────────────────────────────
app.use(errorHandler);

module.exports = app;

// const express = require("express");
// const cors = require("cors");
// const helmet = require("helmet");
// const cookieParser = require("cookie-parser");
// const mongoSanitize = require("express-mongo-sanitize");
// const { generalLimiter } = require("./middleware/rateLimiter");
// const { errorHandler } = require("./middleware/errorHandler");

// // Route imports
// const authRoutes = require("./routes/authRoutes");
// const chatRoutes = require("./routes/chatRoutes");
// const historyRoutes = require("./routes/historyRoutes");

// const app = express();

// // ─── Security Middleware ────────────────────────────────────────
// app.use(
//   helmet({
//     crossOriginResourcePolicy: { policy: "cross-origin" },
//   }),
// );

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );

// // ─── Body Parsers ───────────────────────────────────────────────
// app.use(express.json({ limit: "10kb" }));
// app.use(express.urlencoded({ extended: true, limit: "10kb" }));
// app.use(cookieParser());

// // ─── Data Sanitization ─────────────────────────────────────────
// app.use(mongoSanitize());

// // ─── Rate Limiting ─────────────────────────────────────────────
// app.use("/api", generalLimiter);

// // ─── Routes ────────────────────────────────────────────────────
// app.use("/api/auth", authRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/history", historyRoutes);

// // ─── Health Check ──────────────────────────────────────────────
// app.get("/api/health", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "🚀 Chatbot API is running",
//     environment: process.env.NODE_ENV,
//     timestamp: new Date().toISOString(),
//   });
// });

// // ─── 404 Handler ───────────────────────────────────────────────
// app.all("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route ${req.originalUrl} not found`,
//   });
// });

// // ─── Global Error Handler ──────────────────────────────────────
// app.use(errorHandler);

// module.exports = app;
