export function splitIntoChunks(text, chunkSize = 12000, overlap = 500) {
  const safeSize = Math.max(1000, Number(chunkSize) || 12000);
  const safeOverlap = Math.min(Math.max(0, Number(overlap) || 0), safeSize - 1);
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    let end = Math.min(start + safeSize, text.length);
    if (end < text.length) {
      const boundary = Math.max(text.lastIndexOf('\n', end), text.lastIndexOf('. ', end));
      if (boundary > start + safeSize * 0.6) end = boundary + 1;
    }
    const chunk = text.slice(start, end).trim();
    if (chunk) chunks.push(chunk);
    if (end >= text.length) break;
    start = Math.max(end - safeOverlap, start + 1);
  }
  return chunks;
}
