import mongoose from "mongoose";
const studentSchema = mongoose.Schema({ name: String, age: Number });

export default studentSchema;
