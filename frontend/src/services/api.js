import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000', timeout: 180000 });
export async function summarizePdf(file) {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post('/api/pdf/summarize', formData);
  return data;
}
