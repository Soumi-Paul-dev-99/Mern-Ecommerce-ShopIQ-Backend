const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  if (err.code === 11000) {
    // Duplicate key error
    statusCode = 400; // Bad Request
  }

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

module.exports = errorHandler;
