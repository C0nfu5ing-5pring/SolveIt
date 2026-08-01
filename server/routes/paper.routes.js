import express from "express";
import { uploadPaper, getPapers } from "../controllers/papers.controller.js";
import { verifyToekn } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getPapers);
router.post("/", verifyToekn, upload.single("file"), uploadPaper);

export default router;
