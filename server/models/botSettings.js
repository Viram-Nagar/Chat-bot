const mongoose = require("mongoose");

const botSettingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    botType: {
      type: String,
      enum: ["fitness", "finance", "science", "wellness", "code"],
      required: true,
    },
    // Custom bot name set by user
    customName: {
      type: String,
      trim: true,
      maxlength: [30, "Bot name cannot exceed 30 characters"],
      default: null,
    },
    // Custom greeting message
    customGreeting: {
      type: String,
      trim: true,
      maxlength: [200, "Greeting cannot exceed 200 characters"],
      default: null,
    },
    // Response style preference
    responseStyle: {
      type: String,
      enum: ["detailed", "concise", "friendly", "professional"],
      default: "friendly",
    },
    // Response language
    language: {
      type: String,
      enum: ["english", "hindi", "hinglish"],
      default: "english",
    },
    // Is this bot enabled
    isEnabled: {
      type: Boolean,
      default: true,
    },
    // User's average rating for this bot
    totalRatings: {
      type: Number,
      default: 0,
    },
    totalRatingScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// One settings doc per user per bot
botSettingsSchema.index({ userId: 1, botType: 1 }, { unique: true });

// Virtual: average rating
botSettingsSchema.virtual("averageRating").get(function () {
  if (this.totalRatings === 0) return 0;
  return (this.totalRatingScore / this.totalRatings).toFixed(1);
});

module.exports = mongoose.model("BotSettings", botSettingsSchema);
