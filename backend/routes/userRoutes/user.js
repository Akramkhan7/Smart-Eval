import express from "express";
import { isLoggedIn } from "../../middlewares/isLoggedIn.js";

const router = express.Router();

router.get("/check", isLoggedIn, (req, res) => {
  if (req.user) {
    return res.json({ loggedIn: true, user: req.user });
  }
  return res.json({ loggedIn: false });
});

export default router;
