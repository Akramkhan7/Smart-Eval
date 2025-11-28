import mongoose  from "mongoose";
const administratorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

export default mongoose.model('administrator',administratorSchema);
