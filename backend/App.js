import express from "express";
import conectDB from "./config/db.js";
// import Students from "./models/student.js";
// import Admins from "./models/admin.js";
// import Teachers from "./models/teacher.js";
import session from "express-session";
import cors from "cors";
import flash from "connect-flash";
import env from "dotenv";
import cookieParser from "cookie-parser";
import { userLogin, userRegister } from "./controllers/userLogin.js";
import { teacherLogin, teacherRegister } from "./controllers/adminLogin.js";
import studentRoutes from "./routes/userRoutes/student.js";
import { isLoggedIn } from "./middlewares/isLoggedIn.js";
import bodyParser from "body-parser";
import adminRoutes from "./routes/adminRoutes/admin.js";
import mongoose from "mongoose";
env.config();
conectDB();
const app = express();
app.use(bodyParser.json({ limit: "5mb" }));

//middlwares
app.use(
  cors({
    origin: "http://localhost:5173",
    // origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"], // optional but recommended
    allowedHeaders: ["Content-Type"], // required for fetch
  })
);
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST"], // optional but recommended
//     allowedHeaders: ["Content-Type"], // required for fetch
//   })
// );

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(flash());
app.use(express.json());

//User login/register
app.post("/user/login", userLogin);
app.post("/user/register", userRegister);
//Teacher login/register
app.post("/teacher/login", teacherLogin);
app.post("/teacher/register", teacherRegister);

app.get("/auth/check", isLoggedIn, (req, res) => {
  if (req.user) {
    return res.json({ loggedIn: true, user: req.user });
  }
  return res.json({ loggedIn: false });
});

// redirecting
app.use("/student", studentRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  console.log("This is Home");
  res.send("This is Home");
});

app.listen(3000, () => {
  console.log("Server Running... ");
});
