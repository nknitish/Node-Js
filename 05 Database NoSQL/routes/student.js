import { Router } from "express";

import {
  createStudentController,
  getStudentsController,
  updateStudentController,
  deleteStudentController,
} from "../controllers/student.controller.js";

const router = Router();

router.get("/", getStudentsController);

router.post("/", createStudentController);

router.put("/:id", updateStudentController);

router.delete("/:id", deleteStudentController);

export default router;
