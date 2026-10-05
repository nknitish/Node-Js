import { Router } from "express";
import { userController } from "../controller/userController.js";
import {
  createUserSchema,
  patchUserSchema,
  updateUserSchema,
  userQuerySchema,
  userIdSchema,
} from "../validation/userValidation.js";
import { validate } from "../middleware/validate.js";

const router = Router();

const { getUsers, getUser, createUser, deleteUser, updateUser, patchUser } =
  userController();

router.get("/", validate(userQuerySchema, "query"), getUsers);

router.get("/:id", validate(userIdSchema, "params"), getUser);

router.post("/", validate(createUserSchema, "body"), createUser);

router.delete("/:id", validate(userIdSchema, "params"), deleteUser);

router.put(
  "/:id",
  validate(userIdSchema, "params"),
  validate(updateUserSchema, "body"),
  updateUser,
);

router.patch(
  "/:id",
  validate(userIdSchema, "params"),
  validate(patchUserSchema, "body"),
  patchUser,
);

export default router;
