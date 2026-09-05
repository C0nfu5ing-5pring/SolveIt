import express from "express";
import {
  uploadPaper,
  getPapers,
  downloadPaper,
  getPaperById,
  deletePaper,
  getMyPapers,
} from "../controllers/papers.controller.js";
import { verifyToekn } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getPapers);
router.get("/:id/download", verifyToekn, downloadPaper);
router.get("/:id", getPaperById);
router.post("/", verifyToekn, upload.single("file"), uploadPaper);
router.delete("/:id", verifyToekn, deletePaper);
router.get("/my-papers", verifyToekn, getMyPapers);

export default router;
