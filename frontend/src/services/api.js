import axios from "axios";

export const uploadPDF = async (formData) => {
  const response = await axios.post(
    "https://pdf-to-text-summarizer-1.onrender.com/api/pdf/summarize",
    formData
  );
  return response.data;
};
