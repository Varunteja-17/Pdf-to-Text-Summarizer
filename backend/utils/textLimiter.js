export const limitText = (text, maxLength = 15000) => {
  return text.length > maxLength ? text.slice(0, maxLength) : text;
};
