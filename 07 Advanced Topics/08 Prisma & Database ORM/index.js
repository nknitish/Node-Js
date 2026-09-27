import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3008);
const prisma = new PrismaClient();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", module: "prisma-database-orm" });
});

app.get("/api/users", async (req, res) => {
  const users = await prisma.user.findMany({ include: { posts: true } });
  res.json(users);
});

app.post("/api/users", async (req, res) => {
  const { email, name } = req.body;

  const user = await prisma.user.create({
    data: { email, name },
  });

  res.status(201).json({ success: true, data: user });
});

app.post("/api/posts", async (req, res) => {
  const { title, content, authorId } = req.body;

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId,
    },
  });

  res.status(201).json({ success: true, data: post });
});

app.listen(PORT, () => {
  console.log(`Prisma module running on http://localhost:${PORT}`);
});
