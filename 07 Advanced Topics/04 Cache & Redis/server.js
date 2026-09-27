import express from "express";
import dotenv from "dotenv";
import Redis from "ioredis";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3004);
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const products = {
  1: { id: 1, name: "Laptop", price: 1200 },
  2: { id: 2, name: "Mouse", price: 50 },
  3: { id: 3, name: "Keyboard", price: 90 },
};

app.get("/health", (req, res) => {
  res.json({ status: "ok", module: "cache-redis" });
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const cacheKey = `product:${id}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json({ source: "cache", data: JSON.parse(cached) });
    }

    const product = products[id];
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    await redis.set(cacheKey, JSON.stringify(product), "EX", 60);
    return res.json({ source: "database", data: product });
  } catch (error) {
    console.error("Redis error:", error);
    return res.status(500).json({ success: false, message: "Cache error" });
  }
});

redis.on("connect", () => console.log("Redis connected"));
redis.on("error", (error) => console.error("Redis error:", error.message));

app.listen(PORT, () => {
  console.log(`Cache module running on http://localhost:${PORT}`);
});
