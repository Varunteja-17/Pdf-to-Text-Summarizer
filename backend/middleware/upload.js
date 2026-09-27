import fs from 'node:fs';
import path from 'node:path';
import multer from 'multer';

const uploadDir = path.resolve('uploads');
fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}.pdf`)
});
const fileFilter = (_req, file, cb) => {
  const isPdf = file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf');
  cb(isPdf ? null : new Error('INVALID_FILE_TYPE'), isPdf);
};
export const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });
