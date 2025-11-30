import mongoose from "mongoose";
const teacherSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    default: "Teacher",
  },
});

export default mongoose.model("Teacher", teacherSchema);
