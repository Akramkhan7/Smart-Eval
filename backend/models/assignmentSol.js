import mongoose from "mongoose";

const assignmentSolSchema = new mongoose.Schema({
  name: String,
  courseCode: String,
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  
  status: {
    type: String,
    enum: ["Pending", "Submitted"],
    default:"Pending",
  },
  file: {
    data: Buffer,
    contentType: String,
    fileName: String,
  },
  marks: Number,
  feedback: String,
 
});

export default mongoose.models.AssignmentSol ||
  mongoose.model("AssignmentSol", assignmentSolSchema);
