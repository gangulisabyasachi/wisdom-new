'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

export default function JournalRepository({ initialArticles }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);

  const totalPages = Math.ceil(initialArticles.length / resultsPerPage);

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * resultsPerPage;
    return initialArticles.slice(start, start + resultsPerPage);
  }, [initialArticles, currentPage, resultsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleResultsPerPageChange = (e) => {
    setResultsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="journal-repo-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) 1fr', gap: '6rem' }}>
      
      <div className="toc-section">
        {/* REPOSITORY CONTROLS */}
        <ScrollReveal direction="down" delay={0.1}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem', padding: '1.5rem 2rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Display:</span>
               <select 
                 className="filter-select" 
                 value={resultsPerPage} 
                 onChange={handleResultsPerPageChange}
                 style={{ padding: '0.4rem 1rem', width: '80px' }}
               >
                 <option value={5}>5</option>
                 <option value={10}>10</option>
                 <option value={15}>15</option>
                 <option value={25}>25</option>
               </select>
               <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>manuscripts</span>
            </div>
            
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
              Showing {Math.min((currentPage - 1) * resultsPerPage + 1, initialArticles.length)} - {Math.min(currentPage * resultsPerPage, initialArticles.length)} of {initialArticles.length}
            </div>
          </div>
        </ScrollReveal>

        <h2 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--text-muted)', marginBottom: '4rem', fontWeight: 900, borderLeft: '4px solid var(--accent)', paddingLeft: '1.5rem' }}>
          Manuscript Table of Contents
        </h2>

        <div className="article-list-container">
          {paginatedArticles.length === 0 ? (
            <div className="beauty-card" style={{ textAlign: 'center', padding: '4rem' }}>
              <p>No manuscripts are indexed for this cycle.</p>
            </div>
          ) : (
            paginatedArticles.map((art, index) => (
              <ScrollReveal key={art.slug} direction="up" delay={0.05 * index}>
                <div className="article-card" style={{ marginBottom: '4rem', borderBottom: '1px solid var(--border)', paddingBottom: '3rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--accent)', letterSpacing: '1px' }}>
                      {art.doi ? `DOI: ${art.doi}` : `REF: WSD-${index + 101}`}
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Page {art.page}</span>
                  </div>
                  <h3 style={{ marginBottom: '1.25rem', fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--text-primary)' }}>
                    <Link href={`/${art.slug}`}>{art.topic}</Link>
                  </h3>
                  <div style={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: '1rem', marginBottom: '1.5rem' }}>
                    {art.authors}
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '2.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textAlign: 'justify' }}>
                    {art.abstract}
                  </p>
                  <Link href={`/${art.slug}`} className="btn" style={{ fontSize: '0.85rem', fontWeight: 800, padding: '0.8rem 1.5rem', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                    View Full Record <span>&rarr;</span>
                  </Link>
                </div>
              </ScrollReveal>
            ))
          )}
        </div>

        {/* --- OUT-OF-THE-BOX: SCHOLARLY HORIZON NAVIGATION --- */}
        {totalPages > 1 && (
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
                      onClick={() => handlePageChange(i + 1)}
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
                 onClick={() => handlePageChange(currentPage - 1)}
                 className="horizon-nav-link"
               >
                 Previous Set
               </button>
               <button 
                 disabled={currentPage === totalPages}
                 onClick={() => handlePageChange(currentPage + 1)}
                 className="horizon-nav-link"
               >
                 Next Set
               </button>
            </div>
          </div>
        )}
      </div>

      <aside className="issue-sidebar">
        <ScrollReveal direction="right" delay={0.3}>
          <div style={{ position: 'sticky', top: 'calc(var(--nav-height) + 4rem)' }}>
            <div className="beauty-card" style={{ padding: '3rem', margin: 0 }}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)', marginBottom: '2rem' }}>About this Issue</h4>
              <div className="article-body" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  This edition of WISDOM features multi-disciplinary research addressing critical advancements 
                  in management, educational ethics, and transformative technologies.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Every paper has undergone rigorous double-blinded peer evaluation by internal and external 
                  stewards of the journal.
                </p>
              </div>
              <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1rem' }}>Global Status</div>
                <div style={{ display: 'flex', gap: '8px', color: '#059669', fontSize: '0.85rem', fontWeight: 700 }}>
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  Indexed in Open Repositories
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <Link href="/archives" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>Explore Archives</Link>
            </div>
          </div>
        </ScrollReveal>
      </aside>

      <style jsx>{`
        .scholarly-horizon-container {
          margin-top: 8rem;
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
          margin-bottom: 2rem;
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
          width: 24px;
          height: 24px;
          border: 2px solid var(--accent);
          background: var(--bg-card);
          border-radius: 50%;
          position: relative;
          z-index: 2;
          box-shadow: 0 0 20px var(--accent-light);
        }

        .lens-aura {
          position: absolute;
          inset: -15px;
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
          gap: 4rem;
          margin-top: 2rem;
        }

        .horizon-nav-link {
          background: none;
          border: none;
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 1rem 2rem;
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
