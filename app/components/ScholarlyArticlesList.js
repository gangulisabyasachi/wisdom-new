'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';
import HorizonPagination from './HorizonPagination';

export default function ScholarlyArticlesList({ articles, resultsPerPageDefault = 5 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(resultsPerPageDefault);

  const totalPages = Math.ceil(articles.length / resultsPerPage);

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * resultsPerPage;
    return articles.slice(start, start + resultsPerPage);
  }, [articles, currentPage, resultsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Smooth scroll to the anchor or top of the section
    const element = document.getElementById('scholarly-list-anchor');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const handleResultsPerPageChange = (e) => {
    setResultsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  if (articles.length === 0) {
    return (
      <ScrollReveal direction="up" delay={0.2}>
        <div style={{ padding: '6rem', textAlign: 'center', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-lg)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>No manuscripts detected for this index selection.</p>
        </div>
      </ScrollReveal>
    );
  }

  return (
    <div id="scholarly-list-anchor">
      {/* CONTROLS */}
      <ScrollReveal direction="down" delay={0.1}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', padding: '1.2rem 2rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
             <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px' }}>Per Page:</span>
             <select 
               className="filter-select" 
               value={resultsPerPage} 
               onChange={handleResultsPerPageChange}
               style={{ padding: '0.3rem 0.8rem', width: '70px', fontSize: '0.85rem' }}
             >
               <option value={5}>5</option>
               <option value={15}>15</option>
               <option value={25}>25</option>
               <option value={50}>50</option>
               <option value={100}>100</option>
             </select>
          </div>
          
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Showing {Math.min((currentPage - 1) * resultsPerPage + 1, articles.length)} - {Math.min(currentPage * resultsPerPage, articles.length)} of {articles.length}
          </div>
        </div>
      </ScrollReveal>

      {/* ARTICLES */}
      <div className="discovery-results">
        {paginatedArticles.map((art, idx) => (
          <ScrollReveal key={art.slug} direction="up" delay={0.05 * idx}>
            <div className="article-card" style={{ marginBottom: '4rem', borderBottom: '1px solid var(--border)', paddingBottom: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                   <span>Volume {art.vol}, Issue {art.issue}</span>
                   <span>Page {art.page}</span>
                </div>
                <h3 style={{ marginBottom: '1rem' }}>
                    <Link href={`/${art.slug}`} style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)' }}>{art.topic}</Link>
                </h3>
                <div style={{ color: 'var(--accent)', fontWeight: 700, marginBottom: '1.5rem' }}>{art.authors}</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '2rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textAlign: 'justify' }}>
                   {art.abstract}
                </p>
                <Link href={`/${art.slug}`} className="btn" style={{ fontSize: '0.85rem', fontWeight: 800, padding: '0.8rem 1.5rem', background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                   View Complete Publication <span>&rarr;</span>
                </Link>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* HORIZON PAGINATION */}
      <HorizonPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
