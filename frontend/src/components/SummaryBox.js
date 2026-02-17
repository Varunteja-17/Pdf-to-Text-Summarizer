import React from "react";

const SummaryBox = ({ summary }) => {
  return (
    <div className="summary">
      <h2>Summary</h2>
      <pre>{summary}</pre>
    </div>
  );
};

export default SummaryBox;
