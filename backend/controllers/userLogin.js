import Students from "../models/student.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookie from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

export const userRegister = async (req, res) => {
  try {
    let { name, enrollmentNumber, password } = req.body;

    if (!name || !enrollmentNumber || !password)
      return res.json({ success: false, messages: ["Enter All Details"] });

    let isExist = await Students.findOne({ enrollmentNumber });
    if (isExist) {
      req.flash("error", "User Already Exist. Please Login");
      return res.json({ success: false, messages: req.flash("error") });
    }

    password = await bcrypt.hash(password, 10);

    let user = await Students.create({ name, enrollmentNumber, password });

    req.flash("success", "User Registered Successfully. Please Login");
    return res.json({ success: true, messages: req.flash("success") });
  } catch (err) {
    req.flash("error", "Error in register");
    return res.json({ success: false, messages: req.flash("error") });
  }
};

export const userLogin = async (req, res) => {
  let { enrollmentNumber, password, role } = req.body;
  if (role && role !== "student") {
    req.flash("error", "Role mismatched");
    return res.json({ success: false, messages: req.flash("error") });
  }

  if (!enrollmentNumber || !password) {
    req.flash("error", "Enter enrollmentNumber and password");
    return res.json({ success: false, messages: req.flash("error") });
  }

  let user = await Students.findOne({ enrollmentNumber });
  if (!user) {
    req.flash("error", "User does not exist. Please Register First!");
    return res.json({ success: false, messages: req.flash("error") });
  }

  const validPass = await bcrypt.compare(password, user.password);

  if (!validPass) {
    req.flash("error", "Invalid enrollmentNumber or Password");
    return res.json({ success: false, messages: req.flash("error") });
  }

  let token = jwt.sign(
    { enrollmentNumber: user.enrollmentNumber, id: user._id, role:role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  req.flash("success", "User Logged In Successfully 🎉");
  return res.json({
    success: true,
    messages: req.flash("success"),
    user: {
      id: user._id,
      name: user.name,
      enrollmentNumber: user.enrollmentNumber,
      role: role,
    },
  });
};
