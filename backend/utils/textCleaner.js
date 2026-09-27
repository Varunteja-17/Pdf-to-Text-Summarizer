export function cleanText(text = '') {
  return text
    .replace(/\u0000/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/([\p{L}\p{N}])-[\n\r]+([\p{L}\p{N}])/gu, '$1$2')
    .replace(/[\f\v]+/g, '\n')
    .trim();
}
