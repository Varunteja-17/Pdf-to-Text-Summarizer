import fs from 'node:fs/promises';
import { extractPdf } from '../services/pdfService.js';
import { cleanText } from '../utils/textCleaner.js';
import { splitIntoChunks } from '../services/chunkService.js';
import { summarizeChunks, createFinalSummary } from '../services/geminiService.js';

export async function summarizePdf(req, res, next) {
  if (!req.file) return res.status(400).json({ success: false, message: 'Please upload a valid PDF file.' });
  try {
    const { text, pageCount } = await extractPdf(req.file.path);
    const cleanedText = cleanText(text);
    if (!cleanedText) return res.status(422).json({ success: false, message: "We couldn't extract readable text from this PDF. Please upload a text-based PDF." });
    const chunks = splitIntoChunks(cleanedText, process.env.CHUNK_SIZE, process.env.CHUNK_OVERLAP);
    const chunkSummaries = await summarizeChunks(chunks);
    const summary = await createFinalSummary(chunkSummaries);
    return res.json({ success: true, fileName: req.file.originalname, pageCount, characterCount: cleanedText.length, chunkCount: chunks.length, summary });
  } catch (error) {
    if (error.code === 'GEMINI_CONFIGURATION') return res.status(503).json({ success: false, message: 'The AI service could not process your document. Please try again.' });
    return next(error);
  } finally {
    await fs.unlink(req.file.path).catch(() => {});
  }
}
