'use client';

import React from 'react';

export default function HorizonPagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="scholarly-horizon-container">
      <div className="horizon-meta">
         <span className="horizon-label">Manuscript Index</span>
         <span className="horizon-count">Page {currentPage} of {totalPages}</span>
      </div>
      
      <div className="horizon-line-wrap">
        <div className="horizon-line">
          {/* TRACK PROGRESS */}
          <div 
            className="horizon-progress" 
            style={{ width: `${((currentPage - 1) / (totalPages - 1 || 1)) * 100}%` }}
          ></div>

          {/* INTERACTIVE NODES */}
          <div className="horizon-nodes">
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i + 1}
                onClick={() => onPageChange(i + 1)}
                className={`horizon-node ${currentPage === i + 1 ? 'active' : ''}`}
                style={{ left: `${(i / (totalPages - 1 || 1)) * 100}%` }}
              >
                <div className="node-dot"></div>
                <div className="node-label">{i + 1}</div>
              </button>
            ))}
          </div>
          
          {/* THE SCHOLAR'S LENS (ACTIVE INDICATOR) */}
          <div 
            className="scholars-lens"
            style={{ left: `${((currentPage - 1) / (totalPages - 1 || 1)) * 100}%` }}
          >
            <div className="lens-eye"></div>
            <div className="lens-aura"></div>
          </div>
        </div>
      </div>

      <div className="horizon-controls">
         <button 
           disabled={currentPage === 1}
           onClick={() => onPageChange(currentPage - 1)}
           className="horizon-nav-link"
         >
           Previous Set
         </button>
         <button 
           disabled={currentPage === totalPages}
           onClick={() => onPageChange(currentPage + 1)}
           className="horizon-nav-link"
         >
           Next Set
         </button>
      </div>

      <style jsx>{`
        .scholarly-horizon-container {
          margin-top: 6rem;
          padding: 3rem;
          background: var(--bg-card);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          position: relative;
          overflow: visible;
        }

        .horizon-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 3rem;
          font-family: 'Outfit', sans-serif;
        }

        .horizon-label {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--text-muted);
        }

        .horizon-count {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--accent);
        }

        .horizon-line-wrap {
          padding: 2rem 0;
          position: relative;
          margin-bottom: 1rem;
        }

        .horizon-line {
          height: 2px;
          background: var(--border);
          position: relative;
          width: 100%;
          border-radius: 2px;
        }

        .horizon-progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: linear-gradient(90deg, transparent, var(--accent));
          transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          border-radius: 2px;
        }

        .horizon-nodes {
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          transform: translateY(-50%);
          display: flex;
          pointer-events: none;
        }

        .horizon-node {
          position: absolute;
          transform: translateX(-50%);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          pointer-events: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          z-index: 10;
        }

        .node-dot {
          width: 8px;
          height: 8px;
          background: var(--border);
          border-radius: 50%;
          border: 2px solid var(--bg-card);
          transition: all 0.4s ease;
        }

        .node-label {
          font-size: 0.7rem;
          font-weight: 900;
          color: var(--text-muted);
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .horizon-node:hover .node-dot {
          background: var(--accent);
          transform: scale(1.5);
          box-shadow: 0 0 15px var(--accent-light);
        }

        .horizon-node:hover .node-label,
        .horizon-node.active .node-label {
          opacity: 1;
          transform: translateY(0);
          color: var(--text-primary);
        }

        .horizon-node.active .node-dot {
          background: var(--accent);
          transform: scale(1.2);
        }

        .scholars-lens {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 20;
          transition: left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .lens-eye {
          width: 20px;
          height: 20px;
          border: 2px solid var(--accent);
          background: var(--bg-card);
          border-radius: 50%;
          position: relative;
          z-index: 2;
          box-shadow: 0 0 15px var(--accent-light);
        }

        .lens-aura {
          position: absolute;
          inset: -12px;
          background: radial-gradient(circle, var(--accent-light) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 1;
          animation: lens-pulse 4s ease-in-out infinite;
        }

        @keyframes lens-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }

        .horizon-controls {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 2rem;
        }

        .horizon-nav-link {
          background: none;
          border: none;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 0.5rem 1rem;
          position: relative;
          transition: all 0.3s ease;
        }

        .horizon-nav-link:hover:not(:disabled) {
          color: var(--accent);
          letter-spacing: 4px;
        }

        .horizon-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: var(--accent);
          transform: translateX(-50%);
          transition: width 0.3s ease;
        }

        .horizon-nav-link:hover:not(:disabled)::after {
          width: 100%;
        }

        .horizon-nav-link:disabled {
          opacity: 0.1;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
