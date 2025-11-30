import express from "express";
import conectDB from "./config/db.js";
// import Students from "./models/student.js";
import admininstrators from "./models/administrator.js";
import admins from "./models/admin.js";
import session from "express-session";
import cors from "cors";
import flash from "connect-flash";
import env from "dotenv";
import cookie from "cookie-parser";
import { userLogin, userRegister } from "./controllers/userLogin.js";
import studentRoutes from "./routes/userRoutes/student.js";
import { isLoggedIn } from "./middlewares/isLoggedIn.js";
import bodyParser from "body-parser";
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
app.use(cookie());
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

//login/register
app.post("/user/login", userLogin);
app.post("/user/register", userRegister);

app.get("/auth/check", isLoggedIn, (req, res) => {
  if (req.user) {
    return res.json({ loggedIn: true, user: req.user });
  }
  return res.json({ loggedIn: false });
});

app.use("/student", studentRoutes);


app.get("/", (req, res) => {
  console.log("This is Home");
  res.send("This is Home");
});

app.listen(3000, () => {
  console.log("Server Running... ");
});
