import express from "express";
import mongoose from "mongoose";
import Students from "./models/Students.js";
import dotnv from "dotenv";
dotnv.config();

const app = express();
app.use(express.json());

async function connectMongoDB() {
  const conn = await mongoose.connect(process.env.MONGO_URL);
  if (conn) {
    console.log("Mongo DB Connected");
  } else {
    console.log("Error");
  }
}
connectMongoDB();

app.post("/student", async (req, res) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const regNo = req.body.regNo;

  const newStud = new Students({
    fullName: fullName,
    email: email,
    regNo: regNo,
  });

  const savedStudent = await newStud.save();

  res.json({
    success: true,
    message: "Student Saved Successfully",
    data: savedStudent,
  });
});

app.get("/students", async (req, res) => {
  const students = await Students.find();

  res.json({
    success: true,
    message: "Students fetched Successfully",
    data: students,
  });
});

app.listen(5000, () => {
  console.log("Listen on port 5000");
});