import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: String,
  courseCode: String,
  credit: Number,
  totalAssignment: {
    type: Number,
    default: 5,
  },
  pending: {
    type: Number,
    default: 0,
  },
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
  assignments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
    },
  ],
});

export default mongoose.models.Subject ||
  mongoose.model("Subject", subjectSchema);
