import { Router } from "express";
import { userController } from "../controller/userController.js";

const router = Router();

const { getUsers, getUser, createUser, deleteUser, updateUser, patchUser } =
  userController();

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", createUser);

router.delete("/:id", deleteUser);

router.put("/:id", updateUser);

router.patch("/:id", patchUser);

export default router;
