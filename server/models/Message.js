const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: [true, "Conversation ID is required"],
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: [true, "Role is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
      maxlength: [10000, "Message cannot exceed 10000 characters"],
    },
    tokens: {
      type: Number,
      default: 0,
    },
    isError: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// ─── Index for retrieving messages in order ─────────────────────
messageSchema.index({ conversationId: 1, createdAt: 1 });

module.exports = mongoose.model("Message", messageSchema);
