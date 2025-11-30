import express from "express";
import upload from "../../config/multer.js";
import AssignmentSol from "../../models/assignmentSol.js";
import Assignments from "../../models/assignments.js";
import { isLoggedIn } from "../../middlewares/isLoggedIn.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
const router = express.Router();

router.post(
  "/assignment/upload",
  isLoggedIn,
  upload.single("file"),
  async (req, res) => {
    try {
      let { subject, assignment } = req.body;
      const submitted = await AssignmentSol.create({
        studentId: req.user._id,
        assignmentNum: assignment,
        subject: subject,
        file: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
          fileName: req.file.originalname,
        },
      });

      if (submitted) {
        const rawText = (await pdfParse(req.file.buffer)).text;

        const assignment = await Assignments.create({
          studentId: req.user._id,
          fileName: req.file.originalname,
          rawText,
        });
        if (assignment) {
          return res.json({
            success: true,
            message: "PDF submitted And Uploaded",
          });
        }

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

//plag Checker

router.post("/check-plagiarism", async (req, res) => {
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
