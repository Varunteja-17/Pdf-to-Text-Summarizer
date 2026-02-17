import axios from "axios";

export const uploadPDF = async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/api/pdf/summarize",
    formData
  );
  return response.data;
};
