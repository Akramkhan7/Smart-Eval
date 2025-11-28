import users from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "brcypt";

const userRegister = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) res.json("Enter All Details");

    let isExist = await users.findOne({ email: email });
    if (isExist) {
      return res.json("User Already Exist Please Login");
      return res.redirect("/login");
    }
    password = bcrypt.hash(password, 10);

    let user = await users.create({
      name: name,
      email: email.toLowerCase(),
      password: password,
    });
    if (user) {
      return res.json("User Registered Successfully");
      return res.redirect("/login");
    }
  } catch (err) {
    return res.json("Error In register");
    res.redirect("/login");
  }
};
const userLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) return res.json("Enter email and password ");

    let user = await users.findOne({ email: email });

    if (!user) {
      return res.json("User does't exist , Please Register First!");
    }
    let validPass = bcrypt.compare(password, user.password);

    if (!validPass) {
      return res.json("Please Enter Valid Email and pass");
    }
    let token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiry: "7d",
    });
    res.cookies("token", token);
    return es.redirect("/");
  } catch (err) {
    return res.json("Erorr In Login");
  }
};

export default { userRegister, userLogin };
