const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const { AppError } = require("../middleware/errorHandler");

// @desc    Get all conversations for current user
// @route   GET /api/history/conversations
// @access  Protected
const getAllConversations = async (req, res, next) => {
  try {
    const { botType, page = 1, limit = 20 } = req.query;

    const filter = {
      userId: req.user._id,
      isArchived: false,
    };

    if (botType) filter.botType = botType;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [conversations, total] = await Promise.all([
      Conversation.find(filter)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Conversation.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      conversations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single conversation with messages
// @route   GET /api/history/conversations/:id
// @access  Protected
const getConversationById = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!conversation) {
      return next(new AppError("Conversation not found", 404));
    }

    const messages = await Message.find({
      conversationId: conversation._id,
    })
      .sort({ createdAt: 1 })
      .lean();

    res.status(200).json({
      success: true,
      conversation,
      messages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a conversation
// @route   DELETE /api/history/conversations/:id
// @access  Protected
const deleteConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!conversation) {
      return next(new AppError("Conversation not found", 404));
    }

    // Delete all messages in conversation
    await Message.deleteMany({ conversationId: conversation._id });

    // Delete conversation
    await Conversation.findByIdAndDelete(conversation._id);

    res.status(200).json({
      success: true,
      message: "Conversation deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear all conversations
// @route   DELETE /api/history/conversations
// @access  Protected
const clearAllConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({ userId: req.user._id });
    const conversationIds = conversations.map((c) => c._id);

    await Message.deleteMany({ conversationId: { $in: conversationIds } });
    await Conversation.deleteMany({ userId: req.user._id });

    res.status(200).json({
      success: true,
      message: "All conversations cleared",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllConversations,
  getConversationById,
  deleteConversation,
  clearAllConversations,
};
