# AI PDF Summarizer

A local full-stack application that turns text-based PDFs into concise, structured AI summaries. It uses a map-reduce pipeline: PDF text is extracted, cleaned, split into overlapping chunks, summarized by Gemini, and reduced to one final result.

## Features

- PDF-only upload, with a 10 MB limit and no accounts or database
- Text extraction with `pdf-parse`
- Configurable chunking with overlap for large documents
- Gemini map and reduce summarization stages
- Structured overview, key points, and optional conclusion
- Dark-only responsive UI, drag-and-drop upload, copy, and text download
- Temporary uploads are removed after processing

## Architecture

```text
PDF → extraction → cleaning → chunks → Gemini map summaries → Gemini reduce summary → UI
```

## Tech stack

- Frontend: React, Vite, Axios, CSS
- Backend: Node.js, Express, Multer, pdf-parse, Google Gemini SDK

## Project structure

```text
backend/   Express API and document/LLM services
frontend/  React interface
```

## Installation

Use Node.js 20 or newer.

```bash
cd backend
npm install
Copy-Item .env.example .env
# Add your Google Gemini API key to .env
npm run dev
```

In a second terminal:

```bash
cd frontend
npm install
Copy-Item .env.example .env
  npm start
```

Open `http://localhost:3000`.

## Environment variables

Backend `.env`:

```text
GEMINI_API_KEY=your_api_key_here
PORT=5000
GEMINI_MODEL=gemini-2.5-flash
CHUNK_SIZE=12000
CHUNK_OVERLAP=500
```

Frontend `.env`:

```text
VITE_API_URL=http://localhost:5000
```

The Gemini key is deliberately read only by the backend.

## API

### `POST /api/pdf/summarize`

Send `multipart/form-data` with a `file` field containing a PDF. A successful response contains the source filename, page/character/chunk metadata, and:

```json
{
  "overview": "...",
  "keyPoints": ["..."],
  "conclusion": "..."
}
```

## Limitations

Image-only/scanned PDFs require OCR and are not supported. Gemini usage depends on your Google AI account, available model, and API quota.

## Future improvements

- OCR for scanned documents
- Multilingual summaries
- Streaming progress and responses
- Multiple summary lengths
- PDF question answering
- Citation and page-reference support
