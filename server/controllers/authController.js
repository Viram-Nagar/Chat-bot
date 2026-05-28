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
