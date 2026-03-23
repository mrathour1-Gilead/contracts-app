export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .then((data) => {
        if (!res.headersSent && data !== undefined) {
          res.status(200).json({
            success: true,
            data,
          });
        }
      })
      .catch((err) => {
        console.error("Route Error:", err);

        if (res.headersSent) {
          return next(err);
        }

        res.status(500).json({
          success: false,
          message: err.message || "Internal Server Error",
        });
      });
  };
};