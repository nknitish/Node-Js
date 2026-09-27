import express from "express";
import compression from "compression";
import helmet from "helmet";
import pino from "pino";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3007);
const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

app.use(helmet());
app.use(compression());
app.use(express.json());

app.get("/health", (req, res) => {
  logger.info("Health check requested");
  res.json({ status: "ok", uptime: process.uptime() });
});

app.get("/api/metrics", (req, res) => {
  res.json({
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    pid: process.pid,
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Production-ready API skeleton" });
});

app.listen(PORT, () => {
  logger.info(
    `Deployment and performance module running on http://localhost:${PORT}`,
  );
});
