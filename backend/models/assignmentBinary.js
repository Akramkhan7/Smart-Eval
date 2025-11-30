import mongoose from "mongoose";
const AssignmentSchema = new mongoose.Schema({
  studentId: String,
  fileName: String,
  rawText: String,
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("AssignmentBinary", AssignmentSchema);
