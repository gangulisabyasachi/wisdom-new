'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { searchArticles, getDistinctFilters } from './actions';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ vol: '', issue: '', year: '' });
  const [results, setResults] = useState([]);
  const [allFilters, setAllFilters] = useState({ volumes: [], issues: [], years: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [searchTime, setSearchTime] = useState(0);
  const [error, setError] = useState(null);

  // Load filters on deck
  useEffect(() => {
    getDistinctFilters()
      .then(setAllFilters)
      .catch(err => {
        console.error("Failed to load search filters:", err);
        setError("Network latency in scholarly database synchronization.");
      });
  }, []);

  const performSearch = useCallback(async (q, f) => {
    setIsSearching(true);
    setError(null);
    const start = performance.now();
    try {
      const data = await searchArticles(q, f);
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Search fetch error:", err);
      setError("Unable to retrieve manuscripts. Please verify connection.");
      setResults([]);
    } finally {
      setSearchTime(((performance.now() - start) / 1000).toFixed(2));
      setIsSearching(false);
    }
  }, []);

  // Hybrid Search: Debounced for typing, but also immediate for filters
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() || filters.vol || filters.issue || filters.year) {
        performSearch(query, filters);
      } else {
        setResults([]);
      }
    }, 400); 
    return () => clearTimeout(timer);
  }, [query, filters, performSearch]);

  const handleManualSearch = (e) => {
    e.preventDefault();
    performSearch(query, filters);
  };

  const handleFilterChange = (key, val) => {
    setFilters(prev => ({ ...prev, [key]: val }));
  };

  const highlightText = (text, highlight) => {
    if (!highlight || !highlight.trim()) return text;
    const keywords = highlight.trim().split(/\s+/).filter(k => k.length > 0);
    if (keywords.length === 0) return text;

    const pattern = keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const parts = text.split(new RegExp(`(${pattern})`, 'gi'));
    
    return parts.map((part, i) => 
      keywords.some(k => k.toLowerCase() === part.toLowerCase())
        ? <span key={i} className="search-highlight">{part}</span> 
        : part
    );
  };

  return (
    <main className="reveal">
        {/* HEADER SECTION */}
        <section style={{ background: 'var(--bg-subtle)', padding: 'calc(var(--nav-height) + 4rem) 0 6rem', borderBottom: '1px solid var(--border)' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Global Manuscript Repository</div>
                <h1 style={{ fontSize: '4.5rem', marginBottom: '3rem', letterSpacing: '-3px' }}>Discovery Engine</h1>
                
                <form onSubmit={handleManualSearch} style={{ maxWidth: '850px', margin: '0 auto' }}>
                   <div style={{ position: 'relative', display: 'flex', boxShadow: 'var(--shadow-lg)', borderRadius: '60px', overflow: 'hidden', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                      <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by topic, DOI, or author..." 
                        style={{ flex: 1, padding: '1.5rem 2.5rem', border: 'none', fontSize: '1.25rem', outline: 'none', background: 'transparent', color: 'inherit' }} 
                      />
                      <button type="submit" className="btn btn-primary" style={{ borderRadius: 0, padding: '0 3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                         {isSearching ? <div className="spinner-small" style={{ width: '20px', height: '20px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div> : 'Search'}
                      </button>
                   </div>

                   <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
                      <select value={filters.vol} onChange={(e) => handleFilterChange('vol', e.target.value)} className="filter-select">
                        <option value="">All Volumes</option>
                        {allFilters.volumes.map(v => <option key={v} value={v}>Volume {v}</option>)}
                      </select>
                      <select value={filters.issue} onChange={(e) => handleFilterChange('issue', e.target.value)} className="filter-select">
                        <option value="">All Issues</option>
                        {allFilters.issues.map(i => <option key={i} value={i}>Issue {i}</option>)}
                      </select>
                      <select value={filters.year} onChange={(e) => handleFilterChange('year', e.target.value)} className="filter-select">
                        <option value="">All Years</option>
                        {allFilters.years.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                   </div>
                </form>
            </div>
        </section>

        {/* RESULTS SECTION */}
        <section style={{ padding: '4rem 0 10rem' }}>
            <div className="container" style={{ maxWidth: '950px' }}>
                <div style={{ marginBottom: '3rem', textAlign: 'center', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                   {error ? <span style={{ color: 'var(--accent)' }}>{error}</span> : (
                      <span>
                         {results.length > 0 ? (
                            <>Identified <strong>{results.length}</strong> manuscripts in <strong>{searchTime}</strong> seconds</>
                         ) : (query || filters.vol) ? 'No manuscripts found matching those scholarly parameters.' : 'Enter a query to begin discovery.'}
                      </span>
                   )}
                </div>

                <div className="results-list">
                    {results.map((art) => (
                        <div key={art._id} className="article-card reveal" style={{ animationDelay: '0s' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                               <span>Vol {art.volume}, Issue {art.issue} &bull; {art.date}</span>
                               {art.doi && <span style={{ color: 'var(--accent)' }}>DOI {query ? highlightText(art.doi, query) : art.doi}</span>}
                            </div>
                            <h3 style={{ marginBottom: '1rem' }}>
                                <Link href={`/${art.slug}`} style={{ fontSize: '1.75rem', lineHeight: '1.3', fontFamily: 'var(--font-serif)' }}>
                                   {query ? highlightText(art.topic, query) : art.topic}
                                </Link>
                            </h3>
                            <div style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                               {query ? highlightText(art.authors, query) : art.authors}
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.8', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                               {query ? highlightText(art.abstract, query) : art.abstract}
                            </p>
                            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                               <Link href={`/${art.slug}`} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.8rem' }}>Access Full Publication &rarr;</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <style jsx>{`
            @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
    </main>
  );
}
