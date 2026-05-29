const BotSettings = require("../models/botSettings");
const Feedback = require("../models/feedback");
const { getValidBotTypes } = require("../services/botPersonalities");

// ─── Get settings for all bots ──────────────────────────────────
const getAllBotSettings = async (req, res, next) => {
  try {
    const validBotTypes = getValidBotTypes();

    // Get existing settings
    const existingSettings = await BotSettings.find({
      userId: req.user._id,
    }).lean();

    // Build map
    const settingsMap = {};
    existingSettings.forEach((s) => {
      settingsMap[s.botType] = s;
    });

    // Return settings for all bots (create defaults if missing)
    const allSettings = validBotTypes.map((botType) => {
      return (
        settingsMap[botType] || {
          botType,
          customName: null,
          customGreeting: null,
          responseStyle: "friendly",
          language: "english",
          isEnabled: true,
          totalRatings: 0,
          totalRatingScore: 0,
          averageRating: 0,
        }
      );
    });

    res.status(200).json({
      success: true,
      settings: allSettings,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Get settings for one bot ───────────────────────────────────
const getBotSettings = async (req, res, next) => {
  try {
    const { botType } = req.params;

    let settings = await BotSettings.findOne({
      userId: req.user._id,
      botType,
    });

    // Return defaults if not customized yet
    if (!settings) {
      return res.status(200).json({
        success: true,
        settings: {
          botType,
          customName: null,
          customGreeting: null,
          responseStyle: "friendly",
          language: "english",
          isEnabled: true,
          averageRating: 0,
          totalRatings: 0,
        },
      });
    }

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Update bot settings ────────────────────────────────────────
const updateBotSettings = async (req, res, next) => {
  try {
    const { botType } = req.params;
    const { customName, customGreeting, responseStyle, language, isEnabled } =
      req.body;

    const validBotTypes = getValidBotTypes();
    if (!validBotTypes.includes(botType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid bot type",
      });
    }

    const updateData = {};
    if (customName !== undefined) updateData.customName = customName || null;
    if (customGreeting !== undefined)
      updateData.customGreeting = customGreeting || null;
    if (responseStyle) updateData.responseStyle = responseStyle;
    if (language) updateData.language = language;
    if (isEnabled !== undefined) updateData.isEnabled = isEnabled;

    const settings = await BotSettings.findOneAndUpdate(
      { userId: req.user._id, botType },
      updateData,
      { new: true, upsert: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: "Bot settings updated successfully",
      settings,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Reset bot settings to default ─────────────────────────────
const resetBotSettings = async (req, res, next) => {
  try {
    const { botType } = req.params;

    await BotSettings.findOneAndDelete({
      userId: req.user._id,
      botType,
    });

    res.status(200).json({
      success: true,
      message: "Bot settings reset to default",
    });
  } catch (error) {
    next(error);
  }
};

// ─── Submit feedback / rating ───────────────────────────────────
const submitFeedback = async (req, res, next) => {
  try {
    const { botType, messageId, conversationId, rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Save feedback
    const feedback = await Feedback.create({
      userId: req.user._id,
      conversationId,
      messageId,
      botType,
      rating,
      comment: comment || null,
    });

    // Update bot settings rating stats
    await BotSettings.findOneAndUpdate(
      { userId: req.user._id, botType },
      {
        $inc: {
          totalRatings: 1,
          totalRatingScore: rating,
        },
      },
      { upsert: true },
    );

    res.status(201).json({
      success: true,
      message: "Feedback submitted. Thank you!",
      feedback,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBotSettings,
  getBotSettings,
  updateBotSettings,
  resetBotSettings,
  submitFeedback,
};
