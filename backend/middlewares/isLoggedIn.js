import Students from "../models/student.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookie from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

export const isLoggedIn = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token) {
      req.flash("error", "You are not loggedIn Please login");
      return res.json({ success: false, message: req.flash("error") });
    }

    let decoded = await jwt.verify(token, process.env.JWT_SECRET);
  
    req.user = decoded;
    next();
  } catch (err) {
    return res.json({ success: false, message: "Authorization Failed" });
    if (!email) {
      req.flash("error", "Something Wrong with Authorization");
      return res.json({ success: false, message: req.flash("error") });
    }
    let user = await Students.findOne({ email: email });
    if (!user) {
      req.flash("error", "Something Wrong with Authorization, User Not Exist");
      return res.json({ success: false, message: req.flash("error") });
    }
    req.user = user;
    next();
  }
};
