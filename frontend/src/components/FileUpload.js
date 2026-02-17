import React from "react";

const FileUpload = ({ setFile }) => {
  return (
    <input
      type="file"
      accept="application/pdf"
      onChange={(e) => setFile(e.target.files[0])}
    />
  );
};

export default FileUpload;
