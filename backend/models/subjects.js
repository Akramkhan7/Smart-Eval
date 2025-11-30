import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: String,
  courseCode: String,
  allotedTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  Student: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

export default mongoose.models.Subject ||
  mongoose.model("Subject", subjectSchema);
