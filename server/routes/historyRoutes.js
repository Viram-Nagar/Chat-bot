const express = require("express");
const router = express.Router();
const {
  getAllConversations,
  getConversationById,
  deleteConversation,
  clearAllConversations,
} = require("../controllers/historyController");
const { protect } = require("../middleware/authMiddleware");

router.get("/conversations", protect, getAllConversations);
router.get("/conversations/:id", protect, getConversationById);
router.delete("/conversations/:id", protect, deleteConversation);
router.delete("/conversations", protect, clearAllConversations);

module.exports = router;
