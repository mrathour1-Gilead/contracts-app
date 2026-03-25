export const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      const data = await fn(req, res, next);
      if (!res.headersSent && data !== undefined) {
        res.json({ success: true, data });
      }
    } catch (err) {
      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
      });
    }
  };
};
