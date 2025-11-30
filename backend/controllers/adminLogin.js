import admins from "../models/admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookie from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();



export const adminLogin = async (req, res) => {
  let { enrollmentNumber, password, role } = req.body;
  if (role && role !== "student") {
    req.flash("error", "Role mismatched");
    return res.json({ success: false, messages: req.flash("error") });
  }

  if (!enrollmentNumber || !password) {
    req.flash("error", "Enter enrollmentNumber and password");
    return res.json({ success: false, messages: req.flash("error") });
  }

  let admin = await admins.findOne({ enrollmentNumber });
  if (!admin) {
    req.flash("error", "admin does not exist. Please Register First!");
    return res.json({ success: false, messages: req.flash("error") });
  }

  const validPass = await bcrypt.compare(password, admin.password);

  if (!validPass) {
    req.flash("error", "Invalid enrollmentNumber or Password");
    return res.json({ success: false, messages: req.flash("error") });
  }

  let token = jwt.sign(
    { enrollmentNumber: admin.enrollmentNumber, id: admin._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  req.flash("success", "admin Logged In Successfully 🎉");
  return res.json({
    success: true,
    messages: req.flash("success"),
    admin: {
      id: admin._id,
      name: admin.name,
      enrollmentNumber: admin.enrollmentNumber,
    },
  });
};
