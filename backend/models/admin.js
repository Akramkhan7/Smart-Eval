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
    default: "Admin",
  },
});

export default mongoose.model("Admin", adminSchema);
