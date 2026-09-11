import express from "express";
import {
  signup,
  login,
  getMe,
  updateUserEmail,
  deleteAccount,
  updateAvatar,
} from "../controllers/auth.controller.js";
import { verifyToekn } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", verifyToekn, getMe);
router.put("/update-email", verifyToekn, updateUserEmail);
router.put("/update-avatar", verifyToekn, updateAvatar);
router.delete("/delete-me", verifyToekn, deleteAccount);

export default router;
