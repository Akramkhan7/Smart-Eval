import express from "express";
const app = express();

app.get("/", (req, res) => {
  console.log("This is Home");
  res.send("This is Home")
});

app.listen(3000);
