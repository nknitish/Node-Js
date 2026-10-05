import { Router } from "express";
import { postController } from "../controller/postController.js";
import { validate } from "../middleware/validate.js";
import {
  createPostSchema,
  postIdSchema,
  patchPostSchema,
} from "../validation/postValidation.js";

const router = Router();
const { createPost, getPosts, getPost, updatePost, deletePost } =
  postController();

router.post("/", validate(createPostSchema, "body"), createPost);
router.get("/", getPosts);
router.get("/:id", validate(postIdSchema, "params"), getPost);
router.patch(
  "/:id",
  validate(postIdSchema, "params"),
  validate(patchPostSchema, "body"),
  updatePost,
);
router.delete("/:id", validate(postIdSchema, "params"), deletePost);

export default router;
