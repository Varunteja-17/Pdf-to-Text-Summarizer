import pdf from "pdf-parse";
import { generateSummary } from "../services/geminiService.js";
import { limitText } from "../utils/textLimiter.js";

export const summarizePDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const pdfData = await pdf(req.file.buffer);
    const extractedText = pdfData.text;

    const limitedText = limitText(extractedText);

    const summary = await generateSummary(limitedText);

    res.json({ summary });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error summarizing PDF" });
  }
};
