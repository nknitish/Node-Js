import express from "express";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const PORT = Number(process.env.PORT || 3006);
const connection = new IORedis(
  process.env.REDIS_URL || "redis://localhost:6379",
);

const emailQueue = new Queue("email-queue", { connection });

const worker = new Worker(
  "email-queue",
  async (job) => {
    console.log("Processing job:", job.data);
    io.emit("job-status", { status: "processing", job: job.data });
    return { processed: true, email: job.data.email };
  },
  { connection },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
  io.emit("job-status", { status: "completed", jobId: job.id });
});

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", module: "background-jobs-real-time" });
});

app.post("/api/jobs/send-email", async (req, res) => {
  const { email, message } = req.body;

  const job = await emailQueue.add("send-email", { email, message });
  res.status(202).json({ success: true, jobId: job.id });
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.emit("welcome", { message: "Connected to Node.js real-time server" });

  socket.on("ping", (data) => {
    socket.emit("pong", { message: `Pong: ${data}` });
  });
});

server.listen(PORT, () => {
  console.log(
    `Background jobs and realtime module running on http://localhost:${PORT}`,
  );
});
