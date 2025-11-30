import express from "express";
import upload from "../../config/multer.js";
import AssignmentSol from "../../models/assignmentSol.js";
import { isLoggedIn } from "../../middlewares/isLoggedIn.js";

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

export default router;
