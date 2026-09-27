import { getGeminiClient, geminiModel } from '../config/gemini.js';

const chunkPrompt = (chunk) => `You are an expert document summarization assistant.\n\nSummarize the following section of a PDF.\n\nRequirements:\n- Focus only on information present in the text.\n- Preserve important facts, numbers, dates, definitions, findings and conclusions.\n- Remove repetition and unnecessary wording.\n- Do not invent information or provide opinions.\n- Produce a concise summary that can later be combined with summaries from other sections.\n\nDOCUMENT SECTION:\n${chunk}`;
const finalPrompt = (summaries) => `You are an expert document summarization assistant.\n\nYou are given summaries from different sections of the same PDF. Create one coherent, short summary of the complete document.\n\nRequirements:\n- Do not invent or introduce unsupported information.\n- Remove repeated points and preserve important facts and conclusions.\n- Use simple, clear language.\n- Overview must be 2-4 sentences.\n- Key points must contain 3-8 concise items.\n- Include conclusion only when it is meaningful; otherwise use an empty string.\n\nReturn valid JSON matching the requested schema.\n\nSECTION SUMMARIES:\n${summaries}`;
const summarySchema = { type: 'object', properties: { overview: { type: 'string' }, keyPoints: { type: 'array', items: { type: 'string' } }, conclusion: { type: 'string' } }, required: ['overview', 'keyPoints', 'conclusion'] };

async function generate(prompt, json = false) {
  const response = await getGeminiClient().models.generateContent({
    model: geminiModel,
    contents: prompt,
    config: json ? { responseMimeType: 'application/json', responseSchema: summarySchema, temperature: 0.2 } : { temperature: 0.2 }
  });
  const text = response.text?.trim();
  if (!text) throw new Error('Gemini returned an empty response.');
  return text;
}
function safeSummaryParse(value) {
  const fenced = value.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  const candidate = fenced.match(/\{[\s\S]*\}/)?.[0] || fenced;
  try {
    const parsed = JSON.parse(candidate);
    const keyPoints = Array.isArray(parsed.keyPoints) ? parsed.keyPoints.filter((item) => typeof item === 'string' && item.trim()) : [];
    if (typeof parsed.overview !== 'string' || keyPoints.length === 0) throw new Error('Incomplete JSON');
    return { overview: parsed.overview.trim(), keyPoints: keyPoints.slice(0, 8), conclusion: typeof parsed.conclusion === 'string' ? parsed.conclusion.trim() : '' };
  } catch { return { overview: value.trim(), keyPoints: [], conclusion: '' }; }
}
export async function summarizeChunks(chunks) { const summaries = []; for (const chunk of chunks) summaries.push(await generate(chunkPrompt(chunk))); return summaries; }
export async function createFinalSummary(summaries) { return safeSummaryParse(await generate(finalPrompt(summaries.map((summary, index) => `Section ${index + 1}:\n${summary}`).join('\n\n')), true)); }
