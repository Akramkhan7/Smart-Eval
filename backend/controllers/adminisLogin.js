import adminiss from "../models/adminis.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookie from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();



export const adminisLogin = async (req, res) => {
  let { enrollmentNumber, password, role } = req.body;
  if (role && role !== "student") {
    req.flash("error", "Role mismatched");
    return res.json({ success: false, messages: req.flash("error") });
  }

  if (!enrollmentNumber || !password) {
    req.flash("error", "Enter enrollmentNumber and password");
    return res.json({ success: false, messages: req.flash("error") });
  }

  let adminis = await adminiss.findOne({ enrollmentNumber });
  if (!adminis) {
    req.flash("error", "adminis does not exist. Please Register First!");
    return res.json({ success: false, messages: req.flash("error") });
  }

  const validPass = await bcrypt.compare(password, adminis.password);

  if (!validPass) {
    req.flash("error", "Invalid enrollmentNumber or Password");
    return res.json({ success: false, messages: req.flash("error") });
  }

  let token = jwt.sign(
    { enrollmentNumber: adminis.enrollmentNumber, id: adminis._id ,role:role},
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  req.flash("success", "adminis Logged In Successfully 🎉");
  return res.json({
    success: true,
    messages: req.flash("success"),
    adminis: {
      id: adminis._id,
      name: adminis.name,
      enrollmentNumber: adminis.enrollmentNumber,
    },
  });
};
