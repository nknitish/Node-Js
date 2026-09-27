import express from "express";
import cors from "cors";
import helmet from "helmet";
import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3003);
const uploadDir = path.join(__dirname, "uploads");
const publicDir = path.join(__dirname, "public");

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadDir));
app.use(express.static(publicDir));

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only JPG, PNG, and WEBP files are allowed"), false);
    }

    cb(null, true);
  },
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", module: "file-uploads-static-files" });
});

app.post("/api/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  const inputPath = req.file.path;
  const outputPath = path.join(uploadDir, `thumb-${req.file.filename}`);

  await sharp(inputPath).resize(300, 300, { fit: "cover" }).toFile(outputPath);

  res.status(201).json({
    success: true,
    message: "File uploaded and resized successfully",
    original: `/uploads/${req.file.filename}`,
    thumb: `/uploads/thumb-${req.file.filename}`,
  });
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: err.message });
  }

  if (err) {
    return res.status(400).json({ success: false, message: err.message });
  }

  next();
});

app.listen(PORT, () => {
  console.log(`File upload module running on http://localhost:${PORT}`);
});
