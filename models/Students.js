import { Schema, model } from "mongoose";

const studentSchema = new Schema({
  fullname: String,
  email: String,
  regNo: Number,
});

const Student = model("Student", studentSchema);

export default Student;