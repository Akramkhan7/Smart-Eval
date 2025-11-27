import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/")
    .then(() => {
      console.log("Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDB;

