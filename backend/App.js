import express from "express";
import conectDB from "./config/db.js";
import users from "./models/user.js";
import admininstrators from "./models/administrator.js";
import admins from "./models/admin.js";
import session from "express-session";
import cors from "cors";
import flash from "connect-flash";
import env from "dotenv";
env.config();

const app = express();
// connecting DB
conectDB();

//middlwares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(flash());

app.get("/", (req, res) => {
  console.log("This is Home");
  res.send("This is Home");
});

app.listen(3000, () => {
  console.log("Server Running... ");
});
