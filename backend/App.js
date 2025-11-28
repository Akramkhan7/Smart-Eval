import express, { urlencoded } from "express";
import conectDB from "./config/db.js";
import users from "./models/user.js";
import admininstrators from "./models/administrator.js";
import admins from "./models/admin.js";
import session from "express-session";
import cors from "cors";
import flash from "connect-flash";
import env from "dotenv";
import cookie from "cookie-parser";
import { userLogin, userRegister } from "./controllers/userLogin.js";

env.config();

const app = express();
// connecting DB
conectDB();

//middlwares
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
    methods: ["GET", "POST"], // optional but recommended
    allowedHeaders: ["Content-Type"], // required for fetch
  })
);
app.use(cookie())

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(flash());
app.use(express.json())
// app.use(express.urlencoded({extends:true}))


app.post("/user/login", userLogin);
app.post("/user/register", userRegister);

app.get("/", (req, res) => {
  console.log("This is Home");
  res.send("This is Home");
});

app.listen(3000, () => {
  console.log("Server Running... ");
});
