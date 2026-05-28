const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { authLimiter } = require("../middleware/rateLimiter");
const validate = require("../middleware/authValidation");
const {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} = require("../middleware/authValidation");

// ─── Multer + Cloudinary ─────────────────────────────────────────
let upload;
try {
  const multer = require("multer");
  const { CloudinaryStorage } = require("multer-storage-cloudinary");
  const cloudinary = require("../config/cloudinary");

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "chatbot_avatars",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      transformation: [{ width: 300, height: 300, crop: "fill" }],
    },
  });

  upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
  });
} catch (err) {
  console.warn("⚠️ Multer/Cloudinary not configured:", err.message);
  const multer = require("multer");
  upload = multer();
}

// ─── Public routes ──────────────────────────────────────────────
router.post("/register", authLimiter, validate(registerSchema), register);
router.post("/login", authLimiter, validate(loginSchema), login);

// ─── Protected routes ───────────────────────────────────────────
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);
router.put("/update-profile", protect, upload.single("avatar"), updateProfile);
router.put(
  "/change-password",
  protect,
  validate(changePasswordSchema),
  changePassword,
);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const {
//   register,
//   login,
//   logout,
//   getMe,
//   updateProfile,
//   changePassword,
// } = require("../controllers/authController");
// const { protect } = require("../middleware/authMiddleware");
// const { authLimiter } = require("../middleware/rateLimiter");

// // ─── Multer + Cloudinary (only for profile update) ──────────────
// let upload;
// try {
//   const multer = require("multer");
//   const { CloudinaryStorage } = require("multer-storage-cloudinary");
//   const cloudinary = require("../config/cloudinary");

//   const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: "chatbot_avatars",
//       allowed_formats: ["jpg", "jpeg", "png", "webp"],
//       transformation: [{ width: 300, height: 300, crop: "fill" }],
//     },
//   });

//   upload = multer({
//     storage,
//     limits: { fileSize: 2 * 1024 * 1024 },
//   });
// } catch (err) {
//   console.warn("⚠️ Multer/Cloudinary not configured:", err.message);
//   // Fallback: no file upload
//   const multer = require("multer");
//   upload = multer();
// }

// // ─── Public routes ──────────────────────────────────────────────
// router.post("/register", authLimiter, register);
// router.post("/login", authLimiter, login);

// // ─── Protected routes ───────────────────────────────────────────
// router.post("/logout", protect, logout);
// router.get("/me", protect, getMe);
// router.put("/update-profile", protect, upload.single("avatar"), updateProfile);
// router.put("/change-password", protect, changePassword);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const {
//   register,
//   login,
//   logout,
//   getMe,
//   updateProfile,
//   changePassword,
// } = require("../controllers/authController");
// const { protect } = require("../middleware/authMiddleware");
// const { authLimiter } = require("../middleware/rateLimiter");
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// // Cloudinary storage for avatars
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "chatbot_avatars",
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//     transformation: [{ width: 300, height: 300, crop: "fill" }],
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
// });

// // Public routes
// router.post("/register", authLimiter, register);
// router.post("/login", authLimiter, login);

// // Protected routes
// router.post("/logout", protect, logout);
// router.get("/me", protect, getMe);
// router.put("/update-profile", protect, upload.single("avatar"), updateProfile);
// router.put("/change-password", protect, changePassword);

// module.exports = router;
