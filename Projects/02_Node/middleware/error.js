export const errorHandler = (error, req, res, next) => {
  // Mongoose schema validation error
  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: Object.values(error.errors).map((err) => err.message),
    });
  }

  // Invalid MongoDB ObjectId
  if (error.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID",
    });
  }

  // MongoDB duplicate key error
  if (error.name === "MongoServerError" && error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];

    return res.status(409).json({
      message: `${field} already exists`,
    });
  }

  // Unknown/unexpected error
  console.error(error);

  return res.status(500).json({
    message: "Internal server error",
  });
};
