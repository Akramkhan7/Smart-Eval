import express from "express";
const app = express();
import conectDB from "./config/db.js";
conectDB();

app.get("/", (req, res) => {
  console.log("This is Home");
  res.send("This is Home");
});

app.listen(3000, () => {
  console.log("Server Running... ");
});
