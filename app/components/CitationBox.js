'use client';

import { useState } from 'react';

export default function CitationBox({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy citation:', err);
    }
  };

  return (
    <div className="beauty-card" style={{ margin: 0, borderTop: '4px solid var(--accent)', background: 'var(--bg-card)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)' }}>How to Cite</h4>
        <span style={{ fontSize: '0.65rem', padding: '2px 8px', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: '4px', fontWeight: 700 }}>OSCOLA</span>
      </div>
      
      <div style={{ position: 'relative' }}>
        <div style={{ 
          fontSize: '0.95rem', 
          lineHeight: '1.6', 
          color: 'var(--text-primary)', 
          fontStyle: 'italic', 
          wordBreak: 'break-word', 
          background: 'var(--bg-subtle)', 
          padding: '1.25rem', 
          borderRadius: 'var(--radius-sm)', 
          border: '1px dashed var(--border)',
          paddingRight: '3.5rem'
        }}>
          {text}
        </div>
        
        <button 
          onClick={handleCopy}
          title="Copy Citation"
          style={{ 
            position: 'absolute', 
            top: '10px', 
            right: '10px', 
            background: copied ? 'var(--accent)' : 'var(--bg-card)', 
            color: copied ? 'white' : 'var(--text-secondary)',
            border: '1px solid var(--border)',
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s var(--ease)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {copied ? (
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          ) : (
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
          )}
        </button>
      </div>

      <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
        {copied ? <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Citation copied to scholarly clipboard!</span> : "Always verify citation formatting with your institution's specific guidelines."}
      </p>
    </div>
  );
}
