import model from "../config/gemini.js";

export const generateSummary = async (text) => {
  const result = await model.generateContent({
    contents: [
      {
        parts: [
          {
            text: `Summarize the following document in bullet points:\n\n${text}`
          }
        ]
      }
    ]
  });

  const response = await result.response;

  return response.text();
};
