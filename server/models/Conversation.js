const mongoose = require("mongoose");

const BOT_TYPES = ["fitness", "finance", "science", "wellness", "code"];

const conversationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
    botType: {
      type: String,
      enum: BOT_TYPES,
      required: [true, "Bot type is required"],
    },
    title: {
      type: String,
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
      default: "New Conversation",
    },
    messageCount: {
      type: Number,
      default: 0,
    },
    lastMessage: {
      type: String,
      default: null,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Index for fast queries
conversationSchema.index({ userId: 1, createdAt: -1 });
conversationSchema.index({ userId: 1, botType: 1 });

module.exports = mongoose.model("Conversation", conversationSchema);
