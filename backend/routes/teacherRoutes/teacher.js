import express from "express";
const router = express.Router();
import Subjects from "../../models/subjects.js";
import Teachers from "../../models/teacher.js";
import Students from "../../models/student.js";
import { isLoggedIn } from "../../middlewares/isLoggedIn.js";
import Assignments from "../../models/assignment.js";
import subjects from "../../models/subjects.js";

router.post("/addAssignment", isLoggedIn, async (req, res) => {
  try {
    if (req.user.role.toLowerCase() != "teacher") {
      return res.json("Only Teacher Can Access This");
    }
    let teacher = await Teachers.findById(req.user.id);
    let allotedSubject = teacher.subjectsAlloted;
    if (!allotedSubject) {
      return res.json({
        success: false,
        message: "No Subject Alloted to you",
      });
    }
    let { name, marks } = req.body;
    let assigenment = await Assignments.create({
      name,
      marks,
      subject: allotedSubject,
      unlockedDate: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    if (assigenment) {
      await Subjects.findByIdAndUpdate(
        allotedSubject,
        {
          $push: {
            assignments: assigenment._id,
          },
        },
        {
          new: true,
        }
      );
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
    if (req.user.role.toLowerCase() != "teacher") {
      return res.json("Only Teacher Can Access This");
    }
    let teacher = await Teachers.findById(req.user.id).populate(
      "subjectsAlloted"
    );
    if (!teacher) {
      return res.json({ success: false, message: "Authorization problem" });
    }
    let subjectId = teacher.subjectsAlloted;
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
