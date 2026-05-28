This file is a merged representation of the entire codebase, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
.env.example
app.js
config/cloudinary.js
config/db.js
config/env.js
controllers/authController.js
controllers/chatController.js
controllers/historyController.js
middleware/authMiddleware.js
middleware/authValidation.js
middleware/errorHandler.js
middleware/rateLimiter.js
middleware/sanitize.js
middleware/validate.js
models/Conversation.js
models/Message.js
models/User.js
package.json
routes/authRoutes.js
routes/chatRoutes.js
routes/historyRoutes.js
server.js
services/aiService.js
services/botPersonalities.js
socket/socketHandler.js
utils/tokenHelper.js
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="app.js">
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("./middleware/sanitize");
const xss = require("xss-clean"); // ← FIX 1
const { generalLimiter } = require("./middleware/rateLimiter");
const { errorHandler } = require("./middleware/errorHandler");

// Route imports
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const historyRoutes = require("./routes/historyRoutes");

const app = express();
app.set("trust proxy", 1);

// ─── Security Middleware ────────────────────────────────────────
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

// ─── CORS ───────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: ${origin}`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// ─── Body Parsers ───────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// ─── Data Sanitization ─────────────────────────────────────────
app.use(mongoSanitize);
// app.use(xss()); // ← FIX 1

// ─── Rate Limiting ─────────────────────────────────────────────
app.use("/api", generalLimiter);

// ─── Routes ────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/history", historyRoutes);

// ─── Health Check ───────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Chatbot API is running",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ─── 404 Handler (Express 5 compatible) ────────────────────────  ← FIX 2
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ─── Global Error Handler ───────────────────────────────────────
app.use(errorHandler);

module.exports = app;

// const express = require("express");
// const cors = require("cors");
// const helmet = require("helmet");
// const cookieParser = require("cookie-parser");
// const mongoSanitize = require("express-mongo-sanitize");
// const { generalLimiter } = require("./middleware/rateLimiter");
// const { errorHandler } = require("./middleware/errorHandler");

// // Route imports
// const authRoutes = require("./routes/authRoutes");
// const chatRoutes = require("./routes/chatRoutes");
// const historyRoutes = require("./routes/historyRoutes");

// const app = express();

// // ─── Security Middleware ────────────────────────────────────────
// app.use(
//   helmet({
//     crossOriginResourcePolicy: { policy: "cross-origin" },
//   }),
// );

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );

// // ─── Body Parsers ───────────────────────────────────────────────
// app.use(express.json({ limit: "10kb" }));
// app.use(express.urlencoded({ extended: true, limit: "10kb" }));
// app.use(cookieParser());

// // ─── Data Sanitization ─────────────────────────────────────────
// app.use(mongoSanitize());

// // ─── Rate Limiting ─────────────────────────────────────────────
// app.use("/api", generalLimiter);

// // ─── Routes ────────────────────────────────────────────────────
// app.use("/api/auth", authRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/history", historyRoutes);

// // ─── Health Check ──────────────────────────────────────────────
// app.get("/api/health", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "🚀 Chatbot API is running",
//     environment: process.env.NODE_ENV,
//     timestamp: new Date().toISOString(),
//   });
// });

// // ─── 404 Handler ───────────────────────────────────────────────
// app.all("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route ${req.originalUrl} not found`,
//   });
// });

// // ─── Global Error Handler ──────────────────────────────────────
// app.use(errorHandler);

// module.exports = app;
</file>

<file path="config/cloudinary.js">
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
</file>

<file path="config/db.js">
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on("error", (err) => {
      console.error(`❌ MongoDB connection error: ${err}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  MongoDB disconnected");
    });
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
</file>

<file path="config/env.js">
const requiredEnvVars = ["MONGO_URI", "JWT_SECRET", "ANTHROPIC_API_KEY"];

const validateEnv = () => {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(
      `❌ Missing required environment variables: ${missing.join(", ")}`,
    );
    process.exit(1);
  }

  console.log("✅ Environment variables validated");
};

module.exports = { validateEnv };
</file>

<file path="controllers/authController.js">
const User = require("../models/User");
const {
  generateToken,
  sendTokenCookie,
  clearTokenCookie,
} = require("../utils/tokenHelper");
const { AppError } = require("../middleware/errorHandler");

// ─── Helper: get cloudinary safely ──────────────────────────────
const getCloudinary = () => {
  try {
    return require("../config/cloudinary");
  } catch {
    return null;
  }
};

// ─── @desc    Register new user
// ─── @route   POST /api/auth/register
// ─── @access  Public
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
    });

    // Generate token
    const token = generateToken(user._id);
    sendTokenCookie(res, token);

    // Remove password from response
    const userObj = user.toJSON();

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: userObj,
    });
  } catch (error) {
    console.error("Register error:", error);

    // Duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Mongoose validation error
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)
        .map((e) => e.message)
        .join(", ");
      return res.status(400).json({
        success: false,
        message,
      });
    }

    next(error);
  }
};

// ─── @desc    Login user
// ─── @route   POST /api/auth/login
// ─── @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user + include password
    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Your account has been deactivated",
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // Generate token
    const token = generateToken(user._id);
    sendTokenCookie(res, token);

    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};

// ─── @desc    Logout user
// ─── @route   POST /api/auth/logout
// ─── @access  Protected
const logout = async (req, res, next) => {
  try {
    clearTokenCookie(res);
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ─── @desc    Get current user
// ─── @route   GET /api/auth/me
// ─── @access  Protected
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// ─── @desc    Update profile
// ─── @route   PUT /api/auth/update-profile
// ─── @access  Protected
const updateProfile = async (req, res, next) => {
  try {
    const { name, theme } = req.body;
    const updateData = {};

    if (name && name.trim()) updateData.name = name.trim();
    if (theme && ["light", "dark"].includes(theme)) {
      updateData.theme = theme;
    }

    // Handle avatar upload
    if (req.file) {
      // Delete old avatar from Cloudinary
      if (req.user.avatar?.public_id) {
        try {
          const cloudinary = getCloudinary();
          if (cloudinary) {
            await cloudinary.uploader.destroy(req.user.avatar.public_id);
          }
        } catch (err) {
          console.warn("Could not delete old avatar:", err.message);
        }
      }

      updateData.avatar = {
        public_id: req.file.filename || req.file.public_id,
        url: req.file.path || req.file.secure_url,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    next(error);
  }
};

// ─── @desc    Change password
// ─── @route   PUT /api/auth/change-password
// ─── @access  Protected
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    user.password = newPassword;
    await user.save();

    const token = generateToken(user._id);
    sendTokenCookie(res, token);

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
      token,
    });
  } catch (error) {
    console.error("Change password error:", error);
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
};

// const User = require("../models/User");
// const {
//   generateToken,
//   sendTokenCookie,
//   clearTokenCookie,
// } = require("../utils/tokenHelper");
// const { AppError } = require("../middleware/errorHandler");
// const cloudinary = require("../config/cloudinary");

// // @desc    Register new user
// // @route   POST /api/auth/register
// // @access  Public
// const register = async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return next(new AppError("Email already registered", 400));
//     }

//     // Create user
//     const user = await User.create({ name, email, password });

//     // Generate token and send cookie
//     const token = generateToken(user._id);
//     sendTokenCookie(res, token);

//     res.status(201).json({
//       success: true,
//       message: "Account created successfully",
//       token,
//       user,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Login user
// // @route   POST /api/auth/login
// // @access  Public
// const login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists + get password
//     const user = await User.findOne({ email }).select("+password");
//     if (!user || !(await user.comparePassword(password))) {
//       return next(new AppError("Invalid email or password", 401));
//     }

//     // Update last login
//     user.lastLogin = new Date();
//     await user.save({ validateBeforeSave: false });

//     // Generate token
//     const token = generateToken(user._id);
//     sendTokenCookie(res, token);

//     // Remove password from response
//     user.password = undefined;

//     res.status(200).json({
//       success: true,
//       message: "Logged in successfully",
//       token,
//       user,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Logout user
// // @route   POST /api/auth/logout
// // @access  Protected
// const logout = async (req, res, next) => {
//   try {
//     clearTokenCookie(res);
//     res.status(200).json({
//       success: true,
//       message: "Logged out successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Get current user
// // @route   GET /api/auth/me
// // @access  Protected
// const getMe = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user._id);
//     res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Update profile
// // @route   PUT /api/auth/update-profile
// // @access  Protected
// const updateProfile = async (req, res, next) => {
//   try {
//     const { name, theme } = req.body;
//     const updateData = {};

//     if (name) updateData.name = name;
//     if (theme) updateData.theme = theme;

//     // Handle avatar upload
//     if (req.file) {
//       // Delete old avatar from cloudinary
//       if (req.user.avatar?.public_id) {
//         await cloudinary.uploader.destroy(req.user.avatar.public_id);
//       }

//       updateData.avatar = {
//         public_id: req.file.filename,
//         url: req.file.path,
//       };
//     }

//     const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
//       new: true,
//       runValidators: true,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       user: updatedUser,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @desc    Change password
// // @route   PUT /api/auth/change-password
// // @access  Protected
// const changePassword = async (req, res, next) => {
//   try {
//     const { currentPassword, newPassword } = req.body;

//     const user = await User.findById(req.user._id).select("+password");

//     if (!(await user.comparePassword(currentPassword))) {
//       return next(new AppError("Current password is incorrect", 401));
//     }

//     user.password = newPassword;
//     await user.save();

//     const token = generateToken(user._id);
//     sendTokenCookie(res, token);

//     res.status(200).json({
//       success: true,
//       message: "Password changed successfully",
//       token,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   register,
//   login,
//   logout,
//   getMe,
//   updateProfile,
//   changePassword,
// };
</file>

<file path="controllers/chatController.js">
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
</file>

<file path="controllers/historyController.js">
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
</file>

<file path="middleware/authMiddleware.js">
const { verifyToken } = require("../utils/tokenHelper");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization header first, then cookie
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token || token === "logged_out") {
      return res.status(401).json({
        success: false,
        message: "You are not logged in. Please log in to get access.",
      });
    }

    // Verify token
    const decoded = verifyToken(token);

    // Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: "The user belonging to this token no longer exists.",
      });
    }

    if (!currentUser.isActive) {
      return res.status(401).json({
        success: false,
        message: "Your account has been deactivated.",
      });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please log in again.",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Your token has expired. Please log in again.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Authentication error",
    });
  }
};

module.exports = { protect };
</file>

<file path="middleware/authValidation.js">
const { z } = require("zod");

const registerSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Please provide a valid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Please provide a valid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required"),
});

const changePasswordSchema = z.object({
  currentPassword: z
    .string({ required_error: "Current password is required" })
    .min(1, "Current password is required"),
  newPassword: z
    .string({ required_error: "New password is required" })
    .min(6, "Password must be at least 6 characters"),
});

module.exports = { registerSchema, loginSchema, changePasswordSchema };
</file>

<file path="middleware/errorHandler.js">
// ─── Custom error class ─────────────────────────────────────────
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// ─── Global error handler middleware ────────────────────────────
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Log in development
  if (process.env.NODE_ENV === "development") {
    console.error("🔴 ERROR:", err);
  } else {
    console.error("🔴 ERROR:", message);
  }

  // Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token. Please log in again.";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Your token has expired. Please log in again.";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = { errorHandler, AppError };

// const errorHandler = (err, req, res, next) => {
//   let statusCode = err.statusCode || 500;
//   let message = err.message || "Internal Server Error";

//   // Mongoose CastError (invalid ObjectId)
//   if (err.name === "CastError") {
//     statusCode = 400;
//     message = `Invalid ${err.path}: ${err.value}`;
//   }

//   // Mongoose duplicate key error
//   if (err.code === 11000) {
//     statusCode = 400;
//     const field = Object.keys(err.keyValue)[0];
//     message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
//   }

//   // Mongoose validation error
//   if (err.name === "ValidationError") {
//     statusCode = 400;
//     message = Object.values(err.errors)
//       .map((val) => val.message)
//       .join(", ");
//   }

//   // JWT errors
//   if (err.name === "JsonWebTokenError") {
//     statusCode = 401;
//     message = "Invalid token";
//   }

//   if (err.name === "TokenExpiredError") {
//     statusCode = 401;
//     message = "Token expired";
//   }

//   if (process.env.NODE_ENV === "development") {
//     console.error("🔴 ERROR:", err);
//   }

//   res.status(statusCode).json({
//     success: false,
//     message,
//     ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
//   });
// };

// // Custom error class
// class AppError extends Error {
//   constructor(message, statusCode) {
//     super(message);
//     this.statusCode = statusCode;
//     this.isOperational = true;
//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// module.exports = { errorHandler, AppError };
</file>

<file path="middleware/rateLimiter.js">
const rateLimit = require("express-rate-limit");

// General API rate limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    success: false,
    message:
      "Too many requests from this IP. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth routes limiter (strict)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Chat routes limiter
const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  message: {
    success: false,
    message: "Too many messages sent. Please slow down.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { generalLimiter, authLimiter, chatLimiter };
</file>

<file path="middleware/sanitize.js">
// Combined sanitizer: MongoDB injection + XSS protection
// Fully compatible with Express 5 (does NOT touch req.query)
// Replaces: express-mongo-sanitize + xss-clean

// ─── XSS: strip dangerous HTML tags and attributes ──────────────
const xssClean = (value) => {
  if (typeof value === "string") {
    return (
      value
        // Remove script tags and content
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        // Remove all HTML tags
        .replace(/<[^>]+>/g, "")
        // Remove javascript: protocol
        .replace(/javascript:/gi, "")
        // Remove on* event handlers
        .replace(/on\w+\s*=/gi, "")
        // Remove data: URIs
        .replace(/data:/gi, "")
        // Remove vbscript:
        .replace(/vbscript:/gi, "")
        .trim()
    );
  }
  return value;
};

// ─── MongoDB: remove $ and . keys ──────────────────────────────
const mongoClean = (value) => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    Object.keys(value).forEach((key) => {
      if (key.startsWith("$") || key.includes(".")) {
        delete value[key];
      } else {
        mongoClean(value[key]);
        // Also XSS-clean string values inside objects
        if (typeof value[key] === "string") {
          value[key] = xssClean(value[key]);
        }
      }
    });
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      if (typeof item === "string") {
        value[index] = xssClean(item);
      } else {
        mongoClean(item);
      }
    });
  }

  return value;
};

// ─── Main middleware ────────────────────────────────────────────
const sanitize = (req, res, next) => {
  // Clean request body
  if (req.body) {
    mongoClean(req.body);
  }

  // Clean URL params
  if (req.params) {
    mongoClean(req.params);
  }

  // ⚠️ NEVER touch req.query in Express 5
  // Express 5 made req.query a read-only getter property
  // Both xss-clean and express-mongo-sanitize crash here

  next();
};

module.exports = sanitize;

// // Custom MongoDB sanitizer — compatible with Express 5
// // Replaces express-mongo-sanitize which crashes on Express 5
// // because Express 5 made req.query a read-only getter

// const sanitizeValue = (value) => {
//   // Only process plain objects
//   if (value && typeof value === "object" && !Array.isArray(value)) {
//     Object.keys(value).forEach((key) => {
//       // Remove keys starting with $ (MongoDB operators like $gt, $where)
//       // Remove keys containing . (dot notation attacks)
//       if (key.startsWith("$") || key.includes(".")) {
//         delete value[key];
//       } else {
//         // Recursively sanitize nested objects
//         sanitizeValue(value[key]);
//       }
//     });
//   }

//   // Sanitize arrays too
//   if (Array.isArray(value)) {
//     value.forEach((item) => sanitizeValue(item));
//   }

//   return value;
// };

// const mongoSanitize = (req, res, next) => {
//   // Sanitize request body (POST/PUT data)
//   if (req.body) {
//     sanitizeValue(req.body);
//   }

//   // Sanitize URL params (:id etc)
//   if (req.params) {
//     sanitizeValue(req.params);
//   }

//   // ⚠️ DO NOT touch req.query
//   // Express 5 made req.query a read-only getter
//   // Attempting to modify it causes:
//   // "Cannot set property query of #<IncomingMessage> which has only a getter"

//   next();
// };

// module.exports = mongoSanitize;
</file>

<file path="middleware/validate.js">
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    // Zod validation error
    if (err.errors) {
      const messages = err.errors.map((e) => e.message).join(", ");
      return res.status(400).json({
        success: false,
        message: messages,
      });
    }
    next(err);
  }
};

module.exports = validate;
</file>

<file path="models/Conversation.js">
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
</file>

<file path="models/Message.js">
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
</file>

<file path="models/User.js">
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
      },
    },
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove sensitive fields from JSON output
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

module.exports = mongoose.model("User", userSchema);
</file>

<file path="package.json">
{
  "name": "chatbot-server",
  "version": "1.0.0",
  "description": "AI Chatbot Platform Backend",
  "main": "index.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@google/generative-ai": "^0.24.1",
    "bcryptjs": "^3.0.3",
    "cloudinary": "^1.41.3",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "express-rate-limit": "^8.5.2",
    "helmet": "^8.1.0",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.6.2",
    "multer": "^2.1.1",
    "multer-storage-cloudinary": "^4.0.0",
    "socket.io": "^4.8.3",
    "xss-clean": "^0.1.4",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
</file>

<file path="routes/authRoutes.js">
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
const validate = require("../middleware/validate");
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
</file>

<file path="routes/chatRoutes.js">
const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");
const { chatLimiter } = require("../middleware/rateLimiter");

router.post("/send", protect, chatLimiter, sendMessage);

module.exports = router;
</file>

<file path="routes/historyRoutes.js">
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
</file>

<file path="server.js">
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const { validateEnv } = require("./config/env");
const connectDB = require("./config/db");
const app = require("./app");
const { setupSocketHandlers } = require("./socket/socketHandler");

validateEnv();
connectDB();

const PORT = process.env.PORT || 5000;

// ─── Allowed origins ────────────────────────────────────────────
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

// ─── HTTP server ────────────────────────────────────────────────
const httpServer = http.createServer(app);

// ─── Socket.io ──────────────────────────────────────────────────
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"],
  },
  pingTimeout: 60000,
  pingInterval: 25000,
});

setupSocketHandlers(io);

// ─── Listen ─────────────────────────────────────────────────────
httpServer.listen(PORT, () => {
  console.log(`\n🚀 Server running in ${process.env.NODE_ENV} mode`);
  console.log(`📡 API:    http://localhost:${PORT}/api`);
  console.log(`❤️  Health: http://localhost:${PORT}/api/health`);
  console.log(`🔌 Socket: ws://localhost:${PORT}`);
  console.log(`🌐 Allowed origins: ${allowedOrigins.join(", ")}\n`);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ UNHANDLED REJECTION:", err.name, err.message);
  httpServer.close(() => process.exit(1));
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM shutting down...");
  httpServer.close(() => console.log("✅ Done"));
});

// require("dotenv").config();
// const http = require("http");
// const { Server } = require("socket.io");
// const { validateEnv } = require("./config/env");
// const connectDB = require("./config/db");
// const app = require("./app");
// const { setupSocketHandlers } = require("./socket/socketHandler");

// // Validate env
// validateEnv();

// // Connect DB
// connectDB();

// const PORT = process.env.PORT || 5000;

// // ─── Create HTTP server ─────────────────────────────────────────
// const httpServer = http.createServer(app);

// // ─── Attach Socket.io ───────────────────────────────────────────
// const io = new Server(httpServer, {
//   cors: {
//     origin: process.env.CLIENT_URL || "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST"],
//   },
//   pingTimeout: 60000,
//   pingInterval: 25000,
// });

// // ─── Socket handlers ────────────────────────────────────────────
// setupSocketHandlers(io);

// // ─── Start server ───────────────────────────────────────────────
// httpServer.listen(PORT, () => {
//   console.log(
//     `\n🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
//   );
//   console.log(`📡 API:    http://localhost:${PORT}/api`);
//   console.log(`❤️  Health: http://localhost:${PORT}/api/health`);
//   console.log(`🔌 Socket: ws://localhost:${PORT}\n`);
// });

// // ─── Graceful shutdown ──────────────────────────────────────────
// process.on("unhandledRejection", (err) => {
//   console.error("❌ UNHANDLED REJECTION:", err.name, err.message);
//   httpServer.close(() => process.exit(1));
// });

// process.on("SIGTERM", () => {
//   console.log("👋 SIGTERM received. Shutting down gracefully...");
//   httpServer.close(() => console.log("✅ Process terminated"));
// });

// require("dotenv").config();
// const { validateEnv } = require("./config/env");
// const connectDB = require("./config/db");
// const app = require("./app");

// // Validate environment variables
// validateEnv();

// // Connect to MongoDB
// connectDB();

// const PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, () => {
//   console.log(
//     `\n🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
//   );
//   console.log(`📡 API URL: http://localhost:${PORT}/api`);
//   console.log(`❤️  Health: http://localhost:${PORT}/api/health\n`);
// });

// // Handle unhandled promise rejections
// process.on("unhandledRejection", (err) => {
//   console.error("❌ UNHANDLED REJECTION:", err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });

// // Handle SIGTERM
// process.on("SIGTERM", () => {
//   console.log("👋 SIGTERM received. Shutting down gracefully...");
//   server.close(() => {
//     console.log("✅ Process terminated");
//   });
// });
</file>

<file path="services/aiService.js">
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { getBotPersonality } = require("./botPersonalities");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ─── Build chat history ───────────────────────────────────────
const buildHistory = (conversationHistory) => {
  return conversationHistory.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));
};

// ─── Non-streaming version ────────────────────────────────────
const callGeminiAPI = async (botType, conversationHistory, userMessage) => {
  const bot = getBotPersonality(botType);

  if (!bot) {
    throw new Error(`Invalid bot type: ${botType}`);
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: bot.systemPrompt,
  });

  const chat = model.startChat({
    history: buildHistory(conversationHistory),
  });

  const result = await chat.sendMessage(userMessage);

  const response = result.response;

  return {
    content: response.text(),
    inputTokens: 0,
    outputTokens: 0,
  };
};

// ─── Streaming version ───────────────────────────────────────
const callGeminiAPIStream = async (
  botType,
  conversationHistory,
  userMessage,
  onChunk,
  onDone,
  onError,
) => {
  try {
    const bot = getBotPersonality(botType);

    if (!bot) {
      onError(new Error(`Invalid bot type: ${botType}`));
      return;
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: bot.systemPrompt,
    });

    const chat = model.startChat({
      history: buildHistory(conversationHistory),
    });

    const result = await chat.sendMessageStream(userMessage);

    let fullText = "";

    for await (const chunk of result.stream) {
      const text = chunk.text();

      if (text) {
        fullText += text;
        onChunk(text);
      }
    }

    onDone(fullText, 0);
  } catch (err) {
    onError(err);
  }
};

module.exports = {
  callGeminiAPI,
  callGeminiAPIStream,
};

// const { getBotPersonality } = require("./botPersonalities");

// // ─── Standard (non-streaming) call ─────────────────────────────
// const callClaudeAPI = async (botType, conversationHistory, userMessage) => {
//   const bot = getBotPersonality(botType);
//   if (!bot) throw new Error(`Invalid bot type: ${botType}`);

//   const messages = [
//     ...conversationHistory.map((msg) => ({
//       role: msg.role,
//       content: msg.content,
//     })),
//     { role: "user", content: userMessage },
//   ];

//   const response = await fetch("https://api.anthropic.com/v1/messages", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "x-api-key": process.env.ANTHROPIC_API_KEY,
//       "anthropic-version": "2023-06-01",
//     },
//     body: JSON.stringify({
//       model: "claude-3-5-haiku-20241022",
//       max_tokens: 1024,
//       system: bot.systemPrompt,
//       messages,
//     }),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(
//       `Claude API error: ${errorData.error?.message || "Unknown error"}`,
//     );
//   }

//   const data = await response.json();
//   return {
//     content: data.content[0].text,
//     inputTokens: data.usage?.input_tokens || 0,
//     outputTokens: data.usage?.output_tokens || 0,
//   };
// };

// // ─── Streaming call (yields chunks via callback) ────────────────
// const callClaudeAPIStream = async (
//   botType,
//   conversationHistory,
//   userMessage,
//   onChunk, // callback(chunk: string)
//   onDone, // callback(fullText: string, tokens: number)
//   onError, // callback(error: Error)
// ) => {
//   const bot = getBotPersonality(botType);
//   if (!bot) {
//     onError(new Error(`Invalid bot type: ${botType}`));
//     return;
//   }

//   const messages = [
//     ...conversationHistory.map((msg) => ({
//       role: msg.role,
//       content: msg.content,
//     })),
//     { role: "user", content: userMessage },
//   ];

//   try {
//     const response = await fetch("https://api.anthropic.com/v1/messages", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-key": process.env.ANTHROPIC_API_KEY,
//         "anthropic-version": "2023-06-01",
//       },
//       body: JSON.stringify({
//         model: "claude-3-5-haiku-20241022",
//         max_tokens: 1024,
//         stream: true, // ← streaming
//         system: bot.systemPrompt,
//         messages,
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(
//         `Claude API error: ${errorData.error?.message || "Unknown error"}`,
//       );
//     }

//     // Read SSE stream
//     const reader = response.body.getReader();
//     const decoder = new TextDecoder();
//     let fullText = "";
//     let outputTokens = 0;

//     while (true) {
//       const { done, value } = await reader.read();
//       if (done) break;

//       const chunk = decoder.decode(value, { stream: true });
//       const lines = chunk.split("\n");

//       for (const line of lines) {
//         if (!line.startsWith("data: ")) continue;

//         const data = line.slice(6).trim();
//         if (data === "[DONE]") continue;

//         try {
//           const parsed = JSON.parse(data);

//           // Text delta chunk
//           if (
//             parsed.type === "content_block_delta" &&
//             parsed.delta?.type === "text_delta"
//           ) {
//             const text = parsed.delta.text || "";
//             fullText += text;
//             onChunk(text); // stream to client
//           }

//           // Usage info
//           if (parsed.type === "message_delta" && parsed.usage) {
//             outputTokens = parsed.usage.output_tokens || 0;
//           }
//         } catch (_) {
//           // Skip malformed SSE lines
//         }
//       }
//     }

//     onDone(fullText, outputTokens);
//   } catch (err) {
//     onError(err);
//   }
// };

// module.exports = { callClaudeAPI, callClaudeAPIStream };

// const { getBotPersonality } = require("./botPersonalities");

// const callClaudeAPI = async (botType, conversationHistory, userMessage) => {
//   const bot = getBotPersonality(botType);

//   if (!bot) {
//     throw new Error(`Invalid bot type: ${botType}`);
//   }

//   // Build messages array for Claude
//   // conversationHistory = array of { role, content } from DB (last 20 messages)
//   const messages = [
//     ...conversationHistory.map((msg) => ({
//       role: msg.role,
//       content: msg.content,
//     })),
//     {
//       role: "user",
//       content: userMessage,
//     },
//   ];

//   const response = await fetch("https://api.anthropic.com/v1/messages", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "x-api-key": process.env.ANTHROPIC_API_KEY,
//       "anthropic-version": "2023-06-01",
//     },
//     body: JSON.stringify({
//       model: "claude-3-5-haiku-20241022",
//       max_tokens: 1024,
//       system: bot.systemPrompt,
//       messages: messages,
//     }),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     console.error("Claude API Error:", errorData);
//     throw new Error(
//       `Claude API error: ${errorData.error?.message || "Unknown error"}`,
//     );
//   }

//   const data = await response.json();

//   return {
//     content: data.content[0].text,
//     inputTokens: data.usage?.input_tokens || 0,
//     outputTokens: data.usage?.output_tokens || 0,
//   };
// };

// module.exports = { callClaudeAPI };
</file>

<file path="services/botPersonalities.js">
const BOT_PERSONALITIES = {
  fitness: {
    name: "FitBot",
    emoji: "💪",
    color: "green",
    systemPrompt: `You are FitBot, an expert AI fitness coach with 15+ years of experience in personal training, sports nutrition, and health coaching. 

Your expertise includes:
- Personalized workout plans (strength, cardio, HIIT, yoga, calisthenics)
- Diet and nutrition advice tailored to fitness goals
- Recovery strategies and injury prevention
- Motivation and accountability coaching
- Supplement guidance and healthy lifestyle tips

Communication style:
- Energetic, motivating, and encouraging
- Use fitness emojis occasionally (💪🏋️‍♂️🏃‍♀️🥗)
- Give specific, actionable advice
- Always ask about the user's fitness level and goals before giving plans
- Include sets, reps, duration when giving workout plans
- Format workout plans clearly with bullet points or numbered lists

Important: Always recommend consulting a doctor before starting intense exercise programs. Do not provide medical diagnoses.`,
  },

  finance: {
    name: "FinBot",
    emoji: "💰",
    color: "blue",
    systemPrompt: `You are FinBot, a knowledgeable AI financial advisor with expertise in personal finance, budgeting, and wealth building.

Your expertise includes:
- Personal budgeting strategies (50/30/20 rule, zero-based budgeting)
- Debt management and elimination strategies
- Saving and emergency fund building
- Basic investment concepts (index funds, SIPs, compound interest)
- Expense tracking and financial goal setting
- Credit score improvement tips
- Tax-saving strategies (general guidance)

Communication style:
- Professional yet approachable
- Use financial emojis occasionally (💰📈💳🏦)
- Break down complex financial concepts simply
- Use real examples with numbers when explaining concepts
- Create simple budget tables when needed
- Always encourage building emergency funds first

Important: Provide general financial education only. Always recommend consulting a certified financial advisor for personalized investment decisions. Do not guarantee returns.`,
  },

  science: {
    name: "SciBot",
    emoji: "🔬",
    color: "purple",
    systemPrompt: `You are SciBot, an enthusiastic AI science tutor with deep knowledge in Physics, Chemistry, and Biology for students from middle school through university level.

Your expertise includes:
- Physics: mechanics, thermodynamics, electromagnetism, optics, modern physics
- Chemistry: organic, inorganic, physical chemistry, periodic table, reactions
- Biology: cell biology, genetics, human anatomy, ecology, evolution
- Mathematics related to science (formulas, calculations, graphs)
- Exam preparation and concept clarity
- Scientific method and experimental design

Communication style:
- Enthusiastic and encouraging for learners
- Use science emojis occasionally (🔬⚛️🧬🧪)
- Explain concepts from simple to complex (ELI5 first, then detailed)
- Always provide real-world examples and analogies
- Show step-by-step solutions for numerical problems
- Use formatted equations and formulas clearly
- Ask the student's grade/level to tailor explanations

Important: Encourage curiosity and critical thinking. Make science fun and relatable.`,
  },

  wellness: {
    name: "ZenBot",
    emoji: "🧘",
    color: "teal",
    systemPrompt: `You are ZenBot, a compassionate AI mental wellness companion trained in mindfulness, stress management, and emotional well-being support.

Your expertise includes:
- Stress and anxiety management techniques
- Mindfulness and meditation guidance (guided sessions)
- Sleep hygiene improvement strategies
- Emotional intelligence and self-awareness
- Work-life balance tips
- Breathing exercises and relaxation techniques
- Journaling prompts and positive psychology practices
- Building healthy daily routines and habits

Communication style:
- Warm, calm, empathetic, and non-judgmental
- Use wellness emojis occasionally (🧘🌿💙🌸)
- Speak gently and with compassion
- Validate feelings before offering advice
- Offer grounding exercises when someone seems stressed
- Celebrate small wins and progress

Important: You are a supportive companion, NOT a therapist or doctor. For serious mental health concerns, depression, or crisis situations, always recommend professional help and provide crisis resources (like iCall India: 9152987821 or Vandrevala Foundation: 1860-2662-345).`,
  },

  code: {
    name: "CodeBot",
    emoji: "👨‍💻",
    color: "orange",
    systemPrompt: `You are CodeBot, an expert AI programming mentor with 20+ years of full-stack development experience across multiple technologies.

Your expertise includes:
- Languages: JavaScript, Python, Java, C++, TypeScript, Go, Rust
- Frontend: React, Vue, Angular, HTML/CSS, Tailwind
- Backend: Node.js, Express, Django, FastAPI, Spring Boot
- Databases: MongoDB, PostgreSQL, MySQL, Redis
- DevOps: Docker, Git, CI/CD, cloud deployment
- Data Structures & Algorithms (DSA) for interviews
- Code debugging and optimization
- System design and architecture
- Best practices, design patterns, and clean code principles

Communication style:
- Technical but clear and beginner-friendly
- Use code emojis occasionally (👨‍💻💻🚀⚡)
- Always provide working code examples with proper formatting
- Explain code line by line when needed
- Suggest best practices and common pitfalls
- For DSA: explain the approach first, then code, then time/space complexity
- Format all code in proper code blocks with language specified

Important: Write production-quality, clean, well-commented code. Encourage understanding over copy-pasting.`,
  },
};

const getBotPersonality = (botType) => {
  return BOT_PERSONALITIES[botType] || null;
};

const getValidBotTypes = () => Object.keys(BOT_PERSONALITIES);

module.exports = {
  BOT_PERSONALITIES,
  getBotPersonality,
  getValidBotTypes,
};
</file>

<file path="socket/socketHandler.js">
const { verifyToken } = require("../utils/tokenHelper");
const User = require("../models/User");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const { callGeminiAPIStream } = require("../services/aiService");
const { getValidBotTypes } = require("../services/botPersonalities");

// ─── Auth middleware for Socket.io ──────────────────────────────
const socketAuth = async (socket, next) => {
  try {
    // Token from handshake auth or cookie
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.cookie
        ?.split(";")
        .find((c) => c.trim().startsWith("jwt="))
        ?.split("=")[1];

    if (!token || token === "logged_out") {
      return next(new Error("Authentication required"));
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      return next(new Error("User not found or inactive"));
    }

    socket.user = user;
    next();
  } catch (err) {
    next(new Error("Invalid or expired token"));
  }
};

// ─── Main socket handler ────────────────────────────────────────
const setupSocketHandlers = (io) => {
  // Apply auth middleware
  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log(`🔌 Socket connected: ${socket.user.name} [${socket.id}]`);

    // Join user's personal room
    socket.join(`user:${socket.user._id}`);

    // ── Handle: send_message ──────────────────────────────────
    socket.on("send_message", async (payload) => {
      try {
        const { botType, conversationId, message } = payload;

        // ── Validation ─────────────────────────────────────
        const validBotTypes = getValidBotTypes();
        if (!validBotTypes.includes(botType)) {
          socket.emit("error", { message: "Invalid bot type" });
          return;
        }

        if (!message || message.trim().length === 0) {
          socket.emit("error", { message: "Message cannot be empty" });
          return;
        }

        if (message.length > 2000) {
          socket.emit("error", {
            message: "Message too long. Max 2000 characters.",
          });
          return;
        }

        const trimmedMessage = message.trim();

        // ── Get or create conversation ──────────────────────
        let conversation;

        if (conversationId) {
          conversation = await Conversation.findOne({
            _id: conversationId,
            userId: socket.user._id,
          });

          if (!conversation) {
            socket.emit("error", { message: "Conversation not found" });
            return;
          }
        } else {
          const title =
            trimmedMessage.length > 60
              ? trimmedMessage.substring(0, 60) + "..."
              : trimmedMessage;

          conversation = await Conversation.create({
            userId: socket.user._id,
            botType,
            title,
          });
        }

        // ── Get conversation history ────────────────────────
        const history = await Message.find({
          conversationId: conversation._id,
        })
          .sort({ createdAt: -1 })
          .limit(20)
          .lean();

        const chronologicalHistory = history.reverse();

        // ── Save user message ───────────────────────────────
        const userMessage = await Message.create({
          conversationId: conversation._id,
          userId: socket.user._id,
          role: "user",
          content: trimmedMessage,
        });

        // ── Emit: user message confirmed ────────────────────
        socket.emit("message_saved", {
          conversationId: conversation._id,
          userMessage: {
            _id: userMessage._id,
            role: "user",
            content: userMessage.content,
            createdAt: userMessage.createdAt,
          },
        });

        // ── Emit: AI typing started ─────────────────────────
        socket.emit("ai_typing_start", {
          conversationId: conversation._id,
          botType,
        });

        // ── Accumulate for DB save ──────────────────────────
        let aiMessageId = null;
        let fullAiContent = "";

        // Create a placeholder AI message document first
        const placeholderMsg = await Message.create({
          conversationId: conversation._id,
          userId: socket.user._id,
          role: "assistant",
          content: "Thinking...", // will update
        });
        aiMessageId = placeholderMsg._id;

        // ── Stream AI response ──────────────────────────────
        await callGeminiAPIStream(
          botType,
          chronologicalHistory,
          trimmedMessage,

          // onChunk — emit each token
          (chunk) => {
            socket.emit("ai_chunk", {
              conversationId: conversation._id,
              messageId: aiMessageId,
              chunk,
            });
          },

          // onDone — save full response to DB
          async (fullText, outputTokens) => {
            fullAiContent = fullText;

            // Update placeholder with full content
            await Message.findByIdAndUpdate(aiMessageId, {
              content: fullText,
              tokens: outputTokens,
            });

            // Update conversation metadata
            await Conversation.findByIdAndUpdate(conversation._id, {
              lastMessage: fullText.substring(0, 100),
              $inc: { messageCount: 2 },
            });

            // Emit: streaming complete
            socket.emit("ai_done", {
              conversationId: conversation._id,
              messageId: aiMessageId,
              fullContent: fullText,
              createdAt: new Date().toISOString(),
            });

            console.log(
              `✅ Stream done for ${socket.user.name} — ${fullText.length} chars`,
            );
          },

          // onError — emit error to client
          async (err) => {
            console.error("❌ Streaming error:", err.message);

            // Update placeholder with error message
            await Message.findByIdAndUpdate(aiMessageId, {
              content: "I encountered an error. Please try again.",
              isError: true,
            });

            socket.emit("ai_error", {
              conversationId: conversation._id,
              messageId: aiMessageId,
              message: "AI service error. Please try again.",
            });
          },
        );
      } catch (err) {
        console.error("❌ Socket send_message error:", err);
        socket.emit("error", {
          message: "Something went wrong. Please try again.",
        });
      }
    });

    // ── Handle: join_conversation ──────────────────────────────
    socket.on("join_conversation", (conversationId) => {
      socket.join(`conv:${conversationId}`);
      console.log(`📌 ${socket.user.name} joined conv: ${conversationId}`);
    });

    // ── Handle: leave_conversation ─────────────────────────────
    socket.on("leave_conversation", (conversationId) => {
      socket.leave(`conv:${conversationId}`);
    });

    // ── Handle: typing_indicator ───────────────────────────────
    socket.on("user_typing", ({ conversationId, isTyping }) => {
      socket.to(`conv:${conversationId}`).emit("user_typing", {
        userId: socket.user._id,
        name: socket.user.name,
        isTyping,
      });
    });

    // ── Disconnect ─────────────────────────────────────────────
    socket.on("disconnect", (reason) => {
      console.log(`🔌 Socket disconnected: ${socket.user.name} — ${reason}`);
    });
  });
};

module.exports = { setupSocketHandlers };
</file>

<file path="utils/tokenHelper.js">
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const sendTokenCookie = (res, token) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  res.cookie("jwt", token, cookieOptions);
};

const clearTokenCookie = (res) => {
  res.cookie("jwt", "logged_out", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
};

module.exports = {
  generateToken,
  verifyToken,
  sendTokenCookie,
  clearTokenCookie,
};
</file>

</files>
