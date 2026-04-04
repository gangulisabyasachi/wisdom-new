"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('relevance');
  const [volume, setVolume] = useState('');
  const [issue, setIssue] = useState('');
  const [year, setYear] = useState('');

  // === STATIC DUMMY DATA LATER REPLACED BY DB API FETCH ===
  const dummyArticles = [
    {
      topic: "The Impact of Artificial Intelligence on Modern Legal Systems",
      slug: "ai-legal-systems",
      authors: "Dr. John Doe, Prof. Jane Smith",
      volume: "1",
      issue: "1",
      year: "2026",
      abstract: "This article explores how AI technologies are reshaping the legal landscape, altering standard procedures and raising new ethical concerns.",
      keywords: "Artificial Intelligence, Legal Systems, Ethics, Modern Law"
    },
    {
      topic: "Economic Recoveries in Post-Industrial Cities",
      slug: "economic-recovery-cities",
      authors: "Prof. Alan Turing",
      volume: "1",
      issue: "2",
      year: "2026",
      abstract: "A detailed analysis of urban economic restructuring and the policies that facilitate sustainable recoveries in formerly industrial-heavy regions.",
      keywords: "Urban Economics, Post-Industrial, Recovery"
    }
  ];

  // Dummy dropdown options based on the data
  const volumes = ["1"];
  const issues = ["1", "2"];
  const years = ["2026"];

  const [results, setResults] = useState(dummyArticles);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTime, setSearchTime] = useState(0);

  useEffect(() => {
    // Simulate an AJAX search locally filtering state
    setIsSearching(true);
    const startTime = performance.now();
    const timer = setTimeout(() => {
      let filtered = dummyArticles.filter(art => {
        const matchQuery = q => art.topic.toLowerCase().includes(q) || art.authors.toLowerCase().includes(q) || art.abstract.toLowerCase().includes(q) || art.keywords.toLowerCase().includes(q);
        const q = query.toLowerCase().trim();
        
        if (q && !matchQuery(q)) return false;
        if (volume && art.volume !== volume) return false;
        if (issue && art.issue !== issue) return false;
        if (year && art.year !== year) return false;
        return true;
      });

      // Sort logic dummy
      if (sort === 'title_asc') filtered.sort((a, b) => a.topic.localeCompare(b.topic));
      if (sort === 'title_desc') filtered.sort((a, b) => b.topic.localeCompare(a.topic));
      
      setResults(filtered);
      setSearchTime(((performance.now() - startTime) / 1000).toFixed(2));
      setIsSearching(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query, sort, volume, issue, year]);

  return (
    <div className="search-page" style={{ padding: '6rem 0', background: '#f8fafc', minHeight: '100vh' }}>
      <title>Search Articles - WISDOM Journal</title>
      <div className="search-header" style={{ maxWidth: '900px', margin: '0 auto 2rem', background: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 15px 50px rgba(0,0,0,0.1)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', color: '#1e293b', marginBottom: '1rem' }}>Search WISDOM</h1>
        <div className="main-search" style={{ display: 'flex', maxWidth: '720px', margin: '0 auto 1.5rem', boxShadow: '0 10px 35px rgba(0,0,0,0.15)', borderRadius: '60px', overflow: 'hidden' }}>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, author, keywords, abstract..." 
            autoComplete="off" 
            style={{ flex: 1, padding: '1.4rem 2.2rem', border: 'none', fontSize: '1.25rem', outline: 'none' }} 
          />
          <button type="button" style={{ background: '#1e40af', color: 'white', border: 'none', padding: '0 3.5rem', cursor: 'pointer', fontSize: '1.2rem', fontWeight: '600' }}>Search</button>
        </div>

        <div className="filters" style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ padding: '0.8rem 1.4rem', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'white', fontSize: '1rem' }}>
            <option value="relevance">Most Relevant</option>
            <option value="date_desc">Newest First</option>
            <option value="date_asc">Oldest First</option>
            <option value="title_asc">Title A–Z</option>
            <option value="title_desc">Title Z–A</option>
          </select>
          <select value={volume} onChange={(e) => setVolume(e.target.value)} style={{ padding: '0.8rem 1.4rem', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'white', fontSize: '1rem' }}>
            <option value="">All Volumes</option>
            {volumes.map(v => <option key={v} value={v}>Vol {v}</option>)}
          </select>
          <select value={issue} onChange={(e) => setIssue(e.target.value)} style={{ padding: '0.8rem 1.4rem', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'white', fontSize: '1rem' }}>
            <option value="">All Issues</option>
            {issues.map(i => <option key={i} value={i}>Issue {i}</option>)}
          </select>
          <select value={year} onChange={(e) => setYear(e.target.value)} style={{ padding: '0.8rem 1.4rem', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'white', fontSize: '1rem' }}>
            <option value="">All Years</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      <div className="container">
        <div className="results-summary" style={{ textAlign: 'center', margin: '2rem 0', fontSize: '1.3rem', color: '#1e293b', fontWeight: '600' }}>
          {isSearching ? 'Searching...' : (query || volume || issue || year) ? (
            <span>
              <strong>{results.length}</strong> result{results.length !== 1 ? 's' : ''} found in <strong>{searchTime}s</strong>
            </span>
          ) : 'Type to search...'}
        </div>
        
        <div id="results">
          {results.map((art, idx) => (
            <div key={idx} className="result-card" style={{ background: 'white', padding: '2.2rem', margin: '1.8rem auto', maxWidth: '900px', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', transition: 'all 0.3s ease' }}>
              <div className="result-title" style={{ marginBottom: '0.5rem' }}>
                <Link href={`/${art.slug}`} style={{ fontSize: '1.7rem', color: '#930a17', textDecoration: 'none', fontWeight: '600' }}>
                  {query ? highlightText(art.topic, query) : art.topic}
                </Link>
              </div>
              <p className="article-authors" style={{ margin: '0.75rem 0', fontSize: '0.95rem' }}>
                <strong style={{ color: '#1e40af' }}>Authors:</strong> {art.authors}
              </p>
              <p className="article-pages" style={{ margin: '0.75rem 0', fontSize: '0.95rem' }}>
                <strong style={{ color: '#1e40af' }}>Vol:</strong> {art.volume} | <strong style={{ color: '#1e40af' }}>Issue:</strong> {art.issue} | <strong style={{ color: '#1e40af' }}>Year:</strong> {art.year}
              </p>
              <p className="article-abstract" style={{ margin: '0.75rem 0', fontSize: '0.95rem', lineHeight: '1.6', color: '#333' }}>
                {query ? highlightText(art.abstract, query) : art.abstract}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Utility to wrap matched text dynamically similar to PHP's preg_replace
function highlightText(text, query) {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, i) => 
    part.toLowerCase() === query.toLowerCase() 
      ? <span key={i} className="highlight" style={{ background: '#930a17', color: 'white', padding: '.25rem .6rem', borderRadius: '8px', fontWeight: '700', boxShadow: '0 2px 6px rgba(147, 10, 23, 0.3)' }}>{part}</span> 
      : part
  );
}
