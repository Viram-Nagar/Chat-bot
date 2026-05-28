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
