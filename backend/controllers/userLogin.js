import users from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookie from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

export const userRegister = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.json({ success: false, messages: ["Enter All Details"] });

    email = email.toLowerCase();

    let isExist = await users.findOne({ email });
    if (isExist) {
      req.flash("error", "User Already Exist. Please Login");
      return res.json({ success: false, messages: req.flash("error") });
    }

    password = await bcrypt.hash(password, 10);

    let user = await users.create({ name, email, password });

    req.flash("success", "User Registered Successfully. Please Login");
    return res.json({ success: true, messages: req.flash("success") });
  } catch (err) {
    req.flash("error", "Error in register");
    return res.json({ success: false, messages: req.flash("error") });
  }
};

export const userLogin = async (req, res) => {
  let { email, password, role } = req.body;
  if (role && role !== "student") {
    req.flash("error", "Role mismatched");
    return res.json({ success: false, messages: req.flash("error") });
  }

  if (!email || !password) {
    req.flash("error", "Enter email and password");
    return res.json({ success: false, messages: req.flash("error") });
  }

  email = email.toLowerCase();

  let user = await users.findOne({ email });
  if (!user) {
    req.flash("error", "User does not exist. Please Register First!");
    return res.json({ success: false, messages: req.flash("error") });
  }

  const validPass = await bcrypt.compare(password, user.password);

  if (!validPass) {
    req.flash("error", "Invalid Email or Password");
    return res.json({ success: false, messages: req.flash("error") });
  }

  let token = jwt.sign(
    { email: user.email, id: user._id },
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
      email: user.email,
    },
  });
};
