import mongoose from "mongoose";
const teacherSchema = new mongoose.Schema({
  name: String,
  enrollmentNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    default: "Teacher",
  },
  subjectsAlloted: {
    type: String,
    default: "No Subject Alloted",
  },
  sectionsAlloted: {
    type: String,
    default: "No Subject Alloted",
  },
});

export default mongoose.models.Teacher ||
  mongoose.model("Teacher", teacherSchema);
