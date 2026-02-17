import express from "express";
import { summarizePDF } from "../controllers/pdfController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/summarize", upload.single("file"), summarizePDF);

export default router;
