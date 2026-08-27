import express from "express";
import { submitReport } from "../controllers/reports.controller.js";

const router = express.Router();

router.post("/", submitReport);

export default router;
