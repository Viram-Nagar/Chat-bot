const { verifyToken } = require("../utils/tokenHelper");
const User = require("../models/User");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const { callClaudeAPIStream } = require("../services/aiService");
const { getValidBotTypes } = require("../services/botPersonalities");

// ─── Auth middleware for Socket.io ──────────────────────────────
const socketAuth = async (socket, next) => {
  try {
    // Token from handshake auth or cookie
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.cookie
        ?.split(";")
        .find((c) => c.trim().startsWith("jwt="))
        ?.split("=")[1];

    if (!token || token === "logged_out") {
      return next(new Error("Authentication required"));
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      return next(new Error("User not found or inactive"));
    }

    socket.user = user;
    next();
  } catch (err) {
    next(new Error("Invalid or expired token"));
  }
};

// ─── Main socket handler ────────────────────────────────────────
const setupSocketHandlers = (io) => {
  // Apply auth middleware
  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log(`🔌 Socket connected: ${socket.user.name} [${socket.id}]`);

    // Join user's personal room
    socket.join(`user:${socket.user._id}`);

    // ── Handle: send_message ──────────────────────────────────
    socket.on("send_message", async (payload) => {
      try {
        const { botType, conversationId, message } = payload;

        // ── Validation ─────────────────────────────────────
        const validBotTypes = getValidBotTypes();
        if (!validBotTypes.includes(botType)) {
          socket.emit("error", { message: "Invalid bot type" });
          return;
        }

        if (!message || message.trim().length === 0) {
          socket.emit("error", { message: "Message cannot be empty" });
          return;
        }

        if (message.length > 2000) {
          socket.emit("error", {
            message: "Message too long. Max 2000 characters.",
          });
          return;
        }

        const trimmedMessage = message.trim();

        // ── Get or create conversation ──────────────────────
        let conversation;

        if (conversationId) {
          conversation = await Conversation.findOne({
            _id: conversationId,
            userId: socket.user._id,
          });

          if (!conversation) {
            socket.emit("error", { message: "Conversation not found" });
            return;
          }
        } else {
          const title =
            trimmedMessage.length > 60
              ? trimmedMessage.substring(0, 60) + "..."
              : trimmedMessage;

          conversation = await Conversation.create({
            userId: socket.user._id,
            botType,
            title,
          });
        }

        // ── Get conversation history ────────────────────────
        const history = await Message.find({
          conversationId: conversation._id,
        })
          .sort({ createdAt: -1 })
          .limit(20)
          .lean();

        const chronologicalHistory = history.reverse();

        // ── Save user message ───────────────────────────────
        const userMessage = await Message.create({
          conversationId: conversation._id,
          userId: socket.user._id,
          role: "user",
          content: trimmedMessage,
        });

        // ── Emit: user message confirmed ────────────────────
        socket.emit("message_saved", {
          conversationId: conversation._id,
          userMessage: {
            _id: userMessage._id,
            role: "user",
            content: userMessage.content,
            createdAt: userMessage.createdAt,
          },
        });

        // ── Emit: AI typing started ─────────────────────────
        socket.emit("ai_typing_start", {
          conversationId: conversation._id,
          botType,
        });

        // ── Accumulate for DB save ──────────────────────────
        let aiMessageId = null;
        let fullAiContent = "";

        // Create a placeholder AI message document first
        const placeholderMsg = await Message.create({
          conversationId: conversation._id,
          userId: socket.user._id,
          role: "assistant",
          content: "", // will update
        });
        aiMessageId = placeholderMsg._id;

        // ── Stream AI response ──────────────────────────────
        await callClaudeAPIStream(
          botType,
          chronologicalHistory,
          trimmedMessage,

          // onChunk — emit each token
          (chunk) => {
            socket.emit("ai_chunk", {
              conversationId: conversation._id,
              messageId: aiMessageId,
              chunk,
            });
          },

          // onDone — save full response to DB
          async (fullText, outputTokens) => {
            fullAiContent = fullText;

            // Update placeholder with full content
            await Message.findByIdAndUpdate(aiMessageId, {
              content: fullText,
              tokens: outputTokens,
            });

            // Update conversation metadata
            await Conversation.findByIdAndUpdate(conversation._id, {
              lastMessage: fullText.substring(0, 100),
              $inc: { messageCount: 2 },
            });

            // Emit: streaming complete
            socket.emit("ai_done", {
              conversationId: conversation._id,
              messageId: aiMessageId,
              fullContent: fullText,
              createdAt: new Date().toISOString(),
            });

            console.log(
              `✅ Stream done for ${socket.user.name} — ${fullText.length} chars`,
            );
          },

          // onError — emit error to client
          async (err) => {
            console.error("❌ Streaming error:", err.message);

            // Update placeholder with error message
            await Message.findByIdAndUpdate(aiMessageId, {
              content: "I encountered an error. Please try again.",
              isError: true,
            });

            socket.emit("ai_error", {
              conversationId: conversation._id,
              messageId: aiMessageId,
              message: "AI service error. Please try again.",
            });
          },
        );
      } catch (err) {
        console.error("❌ Socket send_message error:", err);
        socket.emit("error", {
          message: "Something went wrong. Please try again.",
        });
      }
    });

    // ── Handle: join_conversation ──────────────────────────────
    socket.on("join_conversation", (conversationId) => {
      socket.join(`conv:${conversationId}`);
      console.log(`📌 ${socket.user.name} joined conv: ${conversationId}`);
    });

    // ── Handle: leave_conversation ─────────────────────────────
    socket.on("leave_conversation", (conversationId) => {
      socket.leave(`conv:${conversationId}`);
    });

    // ── Handle: typing_indicator ───────────────────────────────
    socket.on("user_typing", ({ conversationId, isTyping }) => {
      socket.to(`conv:${conversationId}`).emit("user_typing", {
        userId: socket.user._id,
        name: socket.user.name,
        isTyping,
      });
    });

    // ── Disconnect ─────────────────────────────────────────────
    socket.on("disconnect", (reason) => {
      console.log(`🔌 Socket disconnected: ${socket.user.name} — ${reason}`);
    });
  });
};

module.exports = { setupSocketHandlers };
