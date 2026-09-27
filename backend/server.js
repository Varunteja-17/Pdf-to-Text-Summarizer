import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pdfRoutes from './routes/pdfRoutes.js';

const app = express();
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());
app.get('/api/health', (_req, res) => res.json({ success: true }));
app.use('/api/pdf', pdfRoutes);
app.use((error, _req, res, _next) => {
  if (error.code === 'LIMIT_FILE_SIZE') return res.status(413).json({ success: false, message: 'File size exceeds the 10 MB limit.' });
  if (error.message === 'INVALID_FILE_TYPE') return res.status(400).json({ success: false, message: 'Please upload a valid PDF file.' });
  console.error('Request failed:', error.message);
  res.status(500).json({ success: false, message: 'The AI service could not process your document. Please try again.' });
});

const port = Number(process.env.PORT) || 5000;
app.listen(port, () => console.log(`AI PDF Summarizer API running on port ${port}`));
