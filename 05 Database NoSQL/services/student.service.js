import Student from "../models/student.model.js";

export function createStudent(data) {
  return Student.create(data);
}

export function getStudents() {
  return Student.find();
}

export function getStudentByName(name) {
  return Student.find({ name });
}

export function getStudent(id) {
  return Student.findById(id);
}

export function updateStudent(id, data) {
  return Student.findByIdAndUpdate(id, data, {
    new: true,
  });
}

export function deleteStudent(id) {
  return Student.findByIdAndDelete(id);
}
