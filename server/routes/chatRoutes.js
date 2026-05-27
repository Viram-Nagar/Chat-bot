const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");
const { chatLimiter } = require("../middleware/rateLimiter");

router.post("/send", protect, chatLimiter, sendMessage);

module.exports = router;
