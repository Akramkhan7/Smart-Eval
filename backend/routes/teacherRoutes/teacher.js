import express from "express";
const router = express.Router();
import Subjects from "../../models/subjects.js";
import Teachers from "../../models/teacher.js";
import Students from "../../models/student.js";
import { isLoggedIn } from "../../middlewares/isLoggedIn.js";
import Assignments from "../../models/assignment.js";

router.post("/addAssignment", isLoggedIn, async (req, res) => {
  try {
    if (req.user.role != "Teacher") {
      return res.json("Only Teacher Can Access This");
    }
    let { name, marks } = req.body;
    console.log(name, marks);
    let assigenment = await Assignments.create({
      name,
      marks,
    });
    if (assigenment) {
      return res.json({
        success: true,
        message: "Assignment Created Successfully",
      });
    }
    return res.json({
      success: false,
      message: "Error in assignment Creation",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "Error in assignment Creation",
    });
  }
});

router.get("/allDetails", isLoggedIn, async (req, res) => {
  try {
    if (req.user.role != "Teacher") {
      return res.json("Only Teacher Can Access This");
    }
    let teacher = await Teachers.findById(req.user._id).populate(
      "subjectsAlloted"
    );
    if (!teacher) {
      return res.json({ success: false, message: "Authorization problem" });
    }
    let subjectId = teacher.subjectsAlloted._id;
    let subject = await Subjects.findById(subjectId).populate("assignments");
    // let allStudents = await Students.find({});
    return res.json({
      success: true,
      subjects: subject,
      //   Students: allStudents,
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Error in subject fetching" });
  }
});

export default router;
