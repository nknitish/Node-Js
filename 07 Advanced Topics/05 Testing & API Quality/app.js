import express from "express";

const app = express();
app.use(express.json());

const users = [{ id: 1, name: "Alice" }];

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/users", (req, res) => {
  const { name } = req.body;

  if (!name || name.trim().length < 2) {
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });
  }

  const user = { id: Date.now(), name };
  users.push(user);
  res.status(201).json({ success: true, data: user });
});

export default app;
