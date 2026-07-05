import express from "express";
import { connectDB } from "./config/db.js";
import studentRouter from "./routes/student.js";

const app = express();
const PORT = 4100;

// Middleware
app.use(express.json());
app.use("/students", studentRouter);

// Connect to DB
await connectDB();

app.get("/", (req, res) => {
  res.send("API is running");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
