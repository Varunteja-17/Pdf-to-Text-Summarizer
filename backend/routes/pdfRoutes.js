import { Router } from 'express';
import { summarizePdf } from '../controllers/pdfController.js';
import { upload } from '../middleware/upload.js';

const router = Router();
router.post('/summarize', upload.single('file'), summarizePdf);
export default router;
