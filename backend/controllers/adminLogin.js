import Teachers from "../models/teacher.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookie from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

export const teacherLogin = async (req, res) => {
  let { enrollmentNumber, password, role } = req.body;
  if (role && role.toLowerCase() !== "teacher") {
    req.flash("error", "Role mismatched");
    return res.json({ success: false, messages: req.flash("error") });
  }

  if (!enrollmentNumber || !password) {
    req.flash("error", "Enter enrollmentNumber and password");
    return res.json({ success: false, messages: req.flash("error") });
  }

  let teacher = await Teachers.findOne({ enrollmentNumber });
  if (!teacher) {
    req.flash("error", "Teacher does not exist. Please Register First!");
    return res.json({ success: false, messages: req.flash("error") });
  }

  const validPass = await bcrypt.compare(password, teacher.password);

  if (!validPass) {
    req.flash("error", "Invalid enrollmentNumber or Password");
    return res.json({ success: false, messages: req.flash("error") });
  }

  let token = jwt.sign(
    { enrollmentNumber: teacher.enrollmentNumber, id: teacher._id, role: role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  req.flash("success", "Teacher Logged In Successfully 🎉");
  return res.json({
    success: true,
    messages: req.flash("success"),
    teacher: {
      id: teacher._id,
      name: teacher.name,
      enrollmentNumber: teacher.enrollmentNumber,
    },
  });
};

export const teacherRegister = async (req, res) => {
  try {
    let { name, enrollmentNumber, password } = req.body;

    if (!name || !enrollmentNumber || !password)
      return res.json({ success: false, messages: ["Enter All Details"] });

    let isExist = await Teachers.findOne({ enrollmentNumber });
    if (isExist) {
      req.flash("error", "Teacher Already Exist. Please Login");
      return res.json({ success: false, messages: req.flash("error") });
    }

    password = await bcrypt.hash(password, 10);

    let teacher = await Teachers.create({ name, enrollmentNumber, password });

    req.flash("success", "Teacher Registered Successfully. Please Login");
    return res.json({ success: true, messages: req.flash("success") });
  } catch (err) {
    req.flash("error", "Error in register");
    return res.json({ success: false, messages: req.flash("error") });
  }
};
