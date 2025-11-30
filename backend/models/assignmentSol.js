import mongoose from "mongoose";

const assignmentSolSchema = new mongoose.Schema({
  name: String,
  courseCode: String,
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  assignmentNum: {
    type: Number,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
  status: {
    type: String,
    enum: ["Pending", "Submitted"],
  },
  file: {
    data: Buffer,
    contentType: String,
    fileName: String,
  },
  marks: Number,
  feedback: String,
  unlockedDate: {
    type: Date,
  },
  dueDate: {
    type: Date,
  },
  submitDate: {
    type: Date,
  },
  locked: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.models.AssignmentSol ||
  mongoose.model("AssignmentSol", assignmentSolSchema);
