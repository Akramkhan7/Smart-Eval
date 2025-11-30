import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
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
});

export default mongoose.model("admin", adminSchema);
