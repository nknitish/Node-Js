import mongoose from "mongoose";
import studentSchema from "../schema/studentSchema.js";

const studentModal = mongoose.model("students", studentSchema);
export default studentModal;
