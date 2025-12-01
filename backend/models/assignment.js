import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  name: String,
  file: {
    data: Buffer,
    contentType: String,
    fileName: String,
  },
  marks: Number,
  submissions: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AssignmentSol",
    default: null,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
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

export default mongoose.models.Assignment ||
  mongoose.model("Assignment", assignmentSchema);
