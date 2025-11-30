import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  enrollmentNumber: {
    type: String,
    required: true,
    unique: true,    
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "Student",
  },
});

export default mongoose.model("User", userSchema);
