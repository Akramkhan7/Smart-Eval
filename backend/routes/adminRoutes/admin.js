import express from "express";
const router = express.Router();
import Subjects from "../../models/subjects.js";

router.post("/addSubject", async (req, res) => {
  try {
    let { name, code, credits } = req.body;
    console.log(name,code,credits)
    let subject = await Subjects.create({
      name,
      courseCode:code,
      credit:credits,
    });
    if (subject) {
      return res.json({
        success: true,
        message: "Subject Created Successfully",
      });
    }
    return res.json({ success: false, message: "Error in subject Creation " });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Error in subject Creation " });
  }
});

export default router;
