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
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
  locked: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.models.Assignment ||
  mongoose.model("Assignment", assignmentSchema);
