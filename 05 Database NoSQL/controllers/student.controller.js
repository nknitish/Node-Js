import {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} from "../services/student.service.js";

export async function createStudentController(req, res) {
  try {
    const student = await createStudent(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

export async function getStudentsController(req, res) {
  try {
    const students = await getStudents();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

export async function updateStudentController(req, res) {
  try {
    const student = await updateStudent(req.params.id, req.body);

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

export async function deleteStudentController(req, res) {
  try {
    const student = await deleteStudent(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
      student,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
