import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    default: "Student",
  },
});

export default mongoose.models.student || mongoose.model("student", studentSchema);
