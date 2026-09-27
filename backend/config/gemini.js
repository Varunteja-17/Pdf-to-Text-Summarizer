import { GoogleGenAI } from '@google/genai';

export function getGeminiClient() {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_api_key_here') {
    const error = new Error('Gemini API key is not configured.');
    error.code = 'GEMINI_CONFIGURATION';
    throw error;
  }
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

export const geminiModel = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
