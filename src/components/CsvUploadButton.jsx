"use client";
import React, { useState } from 'react';
import CsvUpload from './CsvUpload';  

function CsvUploadButton() {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div>
      <button onClick={() => setShowUpload(!showUpload)}>
        {showUpload ? 'Hide Upload' : 'Show Upload'}
      </button>
      {showUpload && <CsvUpload />}
    </div>
  );
}

export default CsvUploadButton;