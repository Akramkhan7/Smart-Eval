import mongoose from "mongoose";
const AssignmentSchema = new mongoose.Schema({
  studentId: String,
  fileName: String,
  rawText: String,
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Assignment", AssignmentSchema);
