'use client';

import { useState } from 'react';

/**
 * A premium, stateful file upload component for the WISDOM Admin Portal.
 * Simplified for manual-entry only.
 */
export default function AdminFileUpload({ name, required = false }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileSize, setFileSize] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      
      const size = selectedFile.size > 1024 * 1024 
        ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` 
        : `${(selectedFile.size / 1024).toFixed(1)} KB`;
      setFileSize(size);
    } else {
      setFile(null);
      setFileName(null);
      setFileSize(null);
    }
  };

  return (
    <div className={`admin-file-wrapper ${fileName ? 'file-selected' : ''}`}>
      <input 
        type="file" 
        name={name} 
        accept=".pdf" 
        className="admin-file-input" 
        required={required}
        onChange={handleFileChange}
      />
      
      {!fileName ? (
        <div className="admin-file-label">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <span style={{ fontWeight: 800 }}>Select Manuscript PDF</span>
          <p style={{ fontSize: '0.75rem', opacity: 0.7, fontWeight: 600 }}>
            PDF files only
          </p>
        </div>
      ) : (
        <div className="admin-file-label reveal" style={{ color: 'var(--admin-primary)' }}>
          <div style={{ 
            background: '#fff1f2', 
            padding: '1.5rem', 
            borderRadius: '50%', 
            marginBottom: '1rem',
            display: 'inline-flex'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span style={{ fontWeight: 900, fontSize: '1.1rem', color: 'var(--admin-primary)' }}>
            {fileName}
          </span>
          <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, marginTop: '0.5rem' }}>
            File size: {fileSize} • Staged for final publish
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', justifyContent: 'center' }}>
            <button 
                type="button" 
                onClick={() => { setFile(null); setFileName(null); setFileSize(null); }}
                style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase', textDecoration: 'underline' }}
            >
                Change Manuscript
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
