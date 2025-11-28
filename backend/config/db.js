import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/Smart-Eval")
    .then(() => {
      console.log("Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDB;
