import express from "express";
import {
  signup,
  login,
  getMe,
  updateUserEmail,
} from "../controllers/auth.controller.js";
import { verifyToekn } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", verifyToekn, getMe);
router.put("/update-email", verifyToekn, updateUserEmail);

export default router;
