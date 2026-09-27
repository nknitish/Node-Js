import express from "express";
import dotenv from "dotenv";
import { z } from "zod";
import Joi from "joi";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3001);

app.use(express.json());

const createUserSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters"),
  email: z.string().email("Email must be valid"),
  age: z.number().int().min(18, "You must be at least 18 years old"),
});

const createUserJoiSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).required(),
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", module: "validation-error-handling" });
});

app.post("/api/users/zod", (req, res) => {
  try {
    const validData = createUserSchema.parse(req.body);
    res.status(201).json({ success: true, data: validData });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
    }

    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

app.post("/api/users/joi", (req, res) => {
  const { error, value } = createUserJoiSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.details.map((item) => ({
        field: item.path.join("."),
        message: item.message,
      })),
    });
  }

  res.status(201).json({ success: true, data: value });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Validation module running on http://localhost:${PORT}`);
});
