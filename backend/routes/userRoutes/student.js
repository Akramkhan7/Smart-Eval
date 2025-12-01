import express from "express";
import upload from "../../config/multer.js";
import AssignmentSol from "../../models/assignmentSol.js";
import AssignmentBinary from "../../models/assignmentBinary.js";
import { isLoggedIn } from "../../middlewares/isLoggedIn.js";
import { createRequire } from "module";
import subjects from "../../models/subjects.js";
import { populate } from "dotenv";
import Assignments from "../../models/assignment.js";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse").default;
const router = express.Router();

router.post(
  "/assignment/upload",
  isLoggedIn,
  upload.single("file"),
  async (req, res) => {
    try {
      let { assignmentId } = req.body;
      const submitted = await AssignmentSol.create({
        studentId: req.user.id,
        assignmentId: assignmentId,
        file: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
          fileName: req.file.originalname,
        },
      });

      if (submitted) {
        await Assignments.findByIdAndUpdate(
          assignmentId,
          {
            $push: {
              submissions: submitted._id,
            },
          },
          {
            new: true,
          }
        );

        return res.json({ success: true, message: "PDF submitted" });
      } else {
        return res.json({
          success: false,
          message: "Something Wrong in Submission",
        });
      }
    } catch (err) {
      console.log(err);
      req.flash("error", "Something Wrong in Submission, try Again later");
      return res.json({
        success: false,
        message: req.flash("error"),
      });
    }
  }
);
//some IMportan
//  console.log(req.file)
//         const rawText = (await pdfParse(req.file.buffer)).text;

//         const assignment = await AssignmentBinary.create({
//           studentId: req.user.id,
//           fileName: req.file.originalname,
//           rawText,
//         });
//         if (assignment) {
//           return res.json({
//             success: true,
//             message: "PDF submitted And Uploaded",
//           });
//         }

//assigenment Rendering

router.get("/allSubjects", isLoggedIn, async (req, res) => {
  let allSubject = await subjects
    .find({})
    .populate({
      path: "assignments",
      populate: { path: "subject" },
    })
    .populate("allotedTeacher");
  res.json({ success: true, subjects: allSubject });
});

//plag Checker

router.post("/check-plagiarism", isLoggedIn, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({ success: false, message: "text is required" });
    }

    const result = await checkAgainstAllAssignments(text, oldAssignments);

    return res.json({
      success: true,
      mostSuspicious: result.mostSuspicious,
      allResults: result.allResults,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Internal error", error: err.message });
  }
});

export default router;
