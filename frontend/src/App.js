import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import SummaryBox from "./components/SummaryBox";
import Loader from "./components/Loader";
import { uploadPDF } from "./services/api";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file) return alert("Upload a PDF");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const data = await uploadPDF(formData);
      setSummary(data.summary);
    } catch (error) {
      alert("Error summarizing PDF");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>AI PDF Summarizer</h1>

      <FileUpload setFile={setFile} />

      <button onClick={handleSubmit}>
        Summarize
      </button>

      {loading && <Loader />}
      {summary && <SummaryBox summary={summary} />}
    </div>
  );
}

export default App;
