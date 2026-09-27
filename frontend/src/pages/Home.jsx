import { useState } from 'react';
import Header from '../components/Header';
import FileUploader from '../components/FileUploader';
import ProcessingStatus from '../components/ProcessingStatus';
import SummaryResult from '../components/SummaryResult';
import Footer from '../components/Footer';
import { summarizePdf } from '../services/api';
export default function Home() {
  const [file, setFile] = useState(null), [error, setError] = useState(''), [loading, setLoading] = useState(false), [result, setResult] = useState(null);
  const setSelectedFile = (candidate, message) => { setError(message); if (candidate) setFile(candidate); };
  const summarize = async () => { if (!file) return; setError(''); setLoading(true); try { setResult(await summarizePdf(file)); } catch (err) { const responseMessage = err.response?.data?.message; setError(responseMessage || (err.request ? 'Unable to connect to the server. Please check that the backend is running.' : 'The AI service could not process your document. Please try again.')); } finally { setLoading(false); } };
  const reset = () => { setFile(null); setResult(null); setError(''); };
  return <main className="shell"><Header />{result ? <SummaryResult result={result} onReset={reset} /> : loading ? <ProcessingStatus /> : <><FileUploader file={file} onFile={setSelectedFile} onRemove={() => setFile(null)} disabled={loading} />{error && <div className="error" role="alert">{error}</div>}{file && <button className="primary-button summarize" onClick={summarize}>Summarize PDF <span>→</span></button>}</>}<Footer /></main>;
}
