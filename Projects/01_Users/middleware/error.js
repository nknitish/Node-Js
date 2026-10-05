import { AppError } from "../errors/AppError.js";
import { ZodError } from "zod";

export const errorHandler = (error, req, res, next) => {
  console.error(error);
  // Application / business error
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  // Zod validation error
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

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

  return res.status(500).json({
    message: "Internal server error",
  });
};
