const express = require("express");
const router = express.Router();
const {
  getAllBotSettings,
  getBotSettings,
  updateBotSettings,
  resetBotSettings,
  submitFeedback,
} = require("../controllers/botSettingsController");
const { protect } = require("../middleware/authMiddleware");

// All routes protected
router.use(protect);

router.get("/", getAllBotSettings);
router.get("/:botType", getBotSettings);
router.put("/:botType", updateBotSettings);
router.delete("/:botType/reset", resetBotSettings);
router.post("/feedback", submitFeedback);

module.exports = router;
