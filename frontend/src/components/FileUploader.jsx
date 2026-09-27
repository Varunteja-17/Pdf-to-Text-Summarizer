import { useRef, useState } from 'react';
const MAX_SIZE = 10 * 1024 * 1024;
export default function FileUploader({ file, onFile, onRemove, disabled }) {
  const inputRef = useRef(null); const [dragging, setDragging] = useState(false);
  const choose = (candidate) => {
    if (!candidate) return;
    if (candidate.type !== 'application/pdf' && !candidate.name.toLowerCase().endsWith('.pdf')) return onFile(null, 'Please upload a valid PDF file.');
    if (candidate.size > MAX_SIZE) return onFile(null, 'File size exceeds the 10 MB limit.');
    onFile(candidate, '');
  };
  if (file) return <section className="upload-card selected"><div className="file-icon">PDF</div><div className="file-details"><span className="eyebrow">SELECTED FILE</span><strong>{file.name}</strong><span>Size: {(file.size / 1024 / 1024).toFixed(2)} MB</span></div><button className="text-button" onClick={onRemove} disabled={disabled}>Remove</button></section>;
  return <section className={`upload-card dropzone ${dragging ? 'dragging' : ''}`} onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(e) => { e.preventDefault(); setDragging(false); choose(e.dataTransfer.files[0]); }}>
    <input ref={inputRef} type="file" accept="application/pdf,.pdf" onChange={(e) => choose(e.target.files[0])} hidden />
    <div className="document-icon">⌁</div><h2>Drag &amp; Drop your PDF here</h2><span>or</span><button className="secondary-button" onClick={() => inputRef.current?.click()} disabled={disabled}>Browse Files</button><small>PDF files up to 10 MB</small>
  </section>;
}
