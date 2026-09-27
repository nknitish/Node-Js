import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3002);
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

app.use(helmet());
app.use(cors({ origin: "*", methods: ["GET", "POST"] }));
app.use(morgan("combined"));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests from this IP" },
});

app.use("/api/", limiter);

const users = [
  {
    id: 1,
    email: "admin@example.com",
    password: bcrypt.hashSync("secret123", 10),
  },
];

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  const exists = users.some((user) => user.email === email);
  if (exists) {
    return res
      .status(409)
      .json({ success: false, message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ id: users.length + 1, email, password: hashedPassword });

  res
    .status(201)
    .json({ success: true, message: "User registered successfully" });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((item) => item.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ success: true, token });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access token missing" });
  }

  jwt.verify(token, JWT_SECRET, (error, user) => {
    if (error) {
      return res
        .status(403)
        .json({ success: false, message: "Token is invalid or expired" });
    }

    req.user = user;
    next();
  });
}

app.get("/api/profile", authenticateToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", module: "security-best-practices" });
});

app.listen(PORT, () => {
  console.log(`Security module running on http://localhost:${PORT}`);
});
