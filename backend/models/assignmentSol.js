import mongoose from "mongoose";

const assignmentSolSchema = new mongoose.Schema({
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
    type: String,
    required: true,
  },
  file: {
    data: Buffer,
    contentType: String,
    fileName: String,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.AssignmentSol ||
  mongoose.model("AssignmentSol", assignmentSolSchema);
