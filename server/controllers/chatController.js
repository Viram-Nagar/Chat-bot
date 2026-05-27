const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const { callClaudeAPI } = require("../services/aiService");
const { getValidBotTypes } = require("../services/botPersonalities");
const { AppError } = require("../middleware/errorHandler");

// @desc    Send message and get AI response
// @route   POST /api/chat/send
// @access  Protected
const sendMessage = async (req, res, next) => {
  try {
    const { botType, conversationId, message } = req.body;

    // Validate bot type
    const validBotTypes = getValidBotTypes();
    if (!validBotTypes.includes(botType)) {
      return next(
        new AppError(
          `Invalid bot type. Valid types: ${validBotTypes.join(", ")}`,
          400,
        ),
      );
    }

    if (!message || message.trim().length === 0) {
      return next(new AppError("Message cannot be empty", 400));
    }

    if (message.length > 2000) {
      return next(new AppError("Message too long. Max 2000 characters.", 400));
    }

    let conversation;

    // Get or create conversation
    if (conversationId) {
      conversation = await Conversation.findOne({
        _id: conversationId,
        userId: req.user._id,
      });

      if (!conversation) {
        return next(new AppError("Conversation not found", 404));
      }
    } else {
      // Create new conversation
      // Auto-generate title from first message (first 60 chars)
      const title =
        message.length > 60 ? message.substring(0, 60) + "..." : message;

      conversation = await Conversation.create({
        userId: req.user._id,
        botType,
        title,
      });
    }

    // Get recent conversation history (last 20 messages for context)
    const history = await Message.find({
      conversationId: conversation._id,
    })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    // Reverse to get chronological order
    const chronologicalHistory = history.reverse();

    // Save user message
    const userMessage = await Message.create({
      conversationId: conversation._id,
      userId: req.user._id,
      role: "user",
      content: message.trim(),
    });

    // Call Claude API
    let aiResponse;
    try {
      aiResponse = await callClaudeAPI(
        botType,
        chronologicalHistory,
        message.trim(),
      );
    } catch (aiError) {
      // Save error message to DB
      const errorMsg = await Message.create({
        conversationId: conversation._id,
        userId: req.user._id,
        role: "assistant",
        content: "I'm sorry, I encountered an error. Please try again.",
        isError: true,
      });

      return res.status(503).json({
        success: false,
        message: "AI service temporarily unavailable",
        conversationId: conversation._id,
        userMessage: {
          _id: userMessage._id,
          role: "user",
          content: message.trim(),
          createdAt: userMessage.createdAt,
        },
        aiMessage: {
          _id: errorMsg._id,
          role: "assistant",
          content: errorMsg.content,
          isError: true,
          createdAt: errorMsg.createdAt,
        },
      });
    }

    // Save AI response
    const aiMessage = await Message.create({
      conversationId: conversation._id,
      userId: req.user._id,
      role: "assistant",
      content: aiResponse.content,
      tokens: aiResponse.outputTokens,
    });

    // Update conversation metadata
    await Conversation.findByIdAndUpdate(conversation._id, {
      lastMessage: aiResponse.content.substring(0, 100),
      $inc: { messageCount: 2 },
    });

    res.status(200).json({
      success: true,
      conversationId: conversation._id,
      botType,
      userMessage: {
        _id: userMessage._id,
        role: "user",
        content: userMessage.content,
        createdAt: userMessage.createdAt,
      },
      aiMessage: {
        _id: aiMessage._id,
        role: "assistant",
        content: aiMessage.content,
        createdAt: aiMessage.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendMessage };
