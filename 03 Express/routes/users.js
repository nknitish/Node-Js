import { Router } from "express";
import { log } from "../middleware/logger.js";

const router = Router();

// Query Parameters. // /users?page=2&limit=4
router.get("/", log, (req, res) => {
  res.json(req.query);
});

// Route Parameters
router.get(`/user/:userId/post/:postId`, log, (req, res) => {
  res.json(req.params);
});

export default router;
