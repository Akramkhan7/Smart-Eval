import mongoose  from "mongoose";
const administratorSchema = new mongoose.Schema({
  name: String,
  email: {
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

export default mongoose.model('administrator',administratorSchema);
