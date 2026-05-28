// Custom MongoDB sanitizer — compatible with Express 5
// Replaces express-mongo-sanitize which crashes on Express 5
// because Express 5 made req.query a read-only getter

const sanitizeValue = (value) => {
  // Only process plain objects
  if (value && typeof value === "object" && !Array.isArray(value)) {
    Object.keys(value).forEach((key) => {
      // Remove keys starting with $ (MongoDB operators like $gt, $where)
      // Remove keys containing . (dot notation attacks)
      if (key.startsWith("$") || key.includes(".")) {
        delete value[key];
      } else {
        // Recursively sanitize nested objects
        sanitizeValue(value[key]);
      }
    });
  }

  // Sanitize arrays too
  if (Array.isArray(value)) {
    value.forEach((item) => sanitizeValue(item));
  }

  return value;
};

const mongoSanitize = (req, res, next) => {
  // Sanitize request body (POST/PUT data)
  if (req.body) {
    sanitizeValue(req.body);
  }

  // Sanitize URL params (:id etc)
  if (req.params) {
    sanitizeValue(req.params);
  }

  // ⚠️ DO NOT touch req.query
  // Express 5 made req.query a read-only getter
  // Attempting to modify it causes:
  // "Cannot set property query of #<IncomingMessage> which has only a getter"

  next();
};

module.exports = mongoSanitize;
