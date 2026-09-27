import fs from 'node:fs/promises';
import pdf from 'pdf-parse';

export async function extractPdf(filePath) {
  const buffer = await fs.readFile(filePath);
  const result = await pdf(buffer);
  return { text: result.text || '', pageCount: result.numpages || 0 };
}
