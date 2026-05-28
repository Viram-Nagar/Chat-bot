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
