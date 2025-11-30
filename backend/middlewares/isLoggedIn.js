import users from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookie from "cookie-parser";
import dotenv from "dotenv";
import Users from "../models/user.js";
dotenv.config();

export const isLoggedIn = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token) {
      req.flash("error", "You are not loggedIn Please login");
      return res.json({ success: false, message: req.flash("error") });
    }

    let decoded = await jwt.verify(token, process.env.JWT_SECRET);
    let enrollmentNumber = decoded.enrollmentNumber;

      let user;
      if(enrollmentNumber === 'T002'){
        user = {enrollmentNumber : 'T002' , role: "admin" };
      }else if(enrollmentNumber === 'T001'){
        user = {enrollmentNumber : 'T001' , role: "teacher" };
      }else{
        user = await Users.find({enrollmentNumber});
        if(!user){
           return res.json({ success: false, message: "User Not Exist" });
        }
      }
    req.user = user;
    next();
  } catch (err) {
    return res.json({ success: false, message: "Authorization Failed" });
  }
};
