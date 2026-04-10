import Link from 'next/link';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import { connectDB } from '../../lib/db';
import Journal from '../../lib/models/Journal';
import ScholarlyArticlesList from '../components/ScholarlyArticlesList';

export const metadata = {
  title: 'Current Issue - WISDOM Journal',
  description: 'Current issue of WISDOM Journal - Volume 2, Issue 1. Latest double-blinded peer-reviewed research articles.',
  keywords: 'current issue, research articles, volume 2, issue 1, wisdom journal, multidisciplinary research',
  alternates: {
    canonical: 'https://www.wisdomj.in/current-issue',
  },
  openGraph: {
    title: 'Current Issue – WISDOM Journal | Volume 2, Issue 1',
    description: 'Latest double-blinded peer-reviewed research articles published in WISDOM Journal. Volume 2, Issue 1.',
    url: 'https://www.wisdomj.in/current-issue',
    siteName: 'WISDOM Journal',
    images: [
      {
        url: '/images/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'WISDOM Journal - Current Issue',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const revalidate = 60;

export default async function CurrentIssuePage({ searchParams }) {
  const { sort } = await searchParams;
  
  let current_volume = 1;
  let current_issue = 1;
  let published_month = '';
  let articles = [];

  // Determine Sort Logic
  let sortObj = { _id: -1 }; // Default: Latest Entry
  if (sort === 'oldest') sortObj = { _id: 1 };
  if (sort === 'date_desc') sortObj = { published_date: -1 };
  if (sort === 'date_asc') sortObj = { published_date: 1 };
  if (sort === 'alpha_asc') sortObj = { topic: 1 };
  if (sort === 'alpha_desc') sortObj = { topic: -1 };

  try {
    await connectDB();
    const latestArticle = await Journal.findOne().sort({ volume: -1, issue: -1 }).lean();
    
    if (latestArticle) {
       current_volume = latestArticle.volume || 1;
       current_issue = latestArticle.issue || 1;
       
       const issueArticles = await Journal.find({ volume: current_volume, issue: current_issue })
         .sort(sortObj)
         .lean();
         
       articles = issueArticles.map(a => ({
         topic: a.topic || '',
         slug: a.slug || '',
         authors: a.authors || '',
         affiliations: a.affiliations || '',
         doi: a.doi || '',
         page: a.page || '',
         abstract: a.abstract || '',
         keywords: a.keywords || '',
         vol: a.volume,
         issue: a.issue
       }));

       if (latestArticle.published_date) {
         published_month = new Date(latestArticle.published_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
       }
    }
  } catch (err) {
    console.error("Failed to fetch current issue:", err);
  }

  const total_articles = articles.length;

  return (
    <main>
        {/* PRESTIGE HEADER */}
        <PageHero>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '4rem', alignItems: 'center' }}>
                <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Active Publication</div>
                    <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', letterSpacing: '-2px' }}>Current Issue</h1>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                       <div style={{ fontSize: '1.5rem', fontWeight: 700, fontStyle: 'italic', fontFamily: 'var(--font-serif)', color: 'var(--text-secondary)' }}>
                          Volume {current_volume}, Issue {current_issue}
                       </div>
                    </div>
                </div>

                {/* 📔 JOURNAL COVER VISUAL */}
                <div style={{ display: 'flex', justifyContent: 'center', perspective: '2000px' }}>
                   <div className="journal-cover-swirl" style={{ width: '240px', height: '320px', background: '#930a17', borderRadius: '4px 12px 12px 4px', boxShadow: '20px 20px 60px rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', padding: '2rem', fontFamily: '"Times New Roman", Times, serif', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ height: '2px', background: 'white', width: '40px', marginBottom: '1rem' }}></div>
                      <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'normal', lineHeight: 1, letterSpacing: '2px', marginBottom: '2rem' }}>WISDOM</div>
                      <div style={{ flex: 1 }}></div>
                      <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', fontWeight: 'normal', textTransform: 'uppercase' }}>Current Issue</div>
                      <div style={{ color: 'white', fontSize: '1rem', fontWeight: 'normal', marginTop: '5px' }}>Vol {current_volume}, Iss {current_issue}</div>
                    </div>
                 </div>
             </div>
        </PageHero>

        {/* TABLE OF CONTENTS REPOSITORY */}
        <section style={{ padding: '8rem 0' }}>
            <div className="container">
                
                <div style={{ marginBottom: '6rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--text-muted)' }}>
                        Repository Reordering
                    </div>
                    
                    {/* 🛥️ UNIQUE ELITE SEGMENTED DOCK */}
                    <div style={{ 
                        background: 'rgba(15, 20, 30, 0.05)', 
                        padding: '0.5rem', 
                        borderRadius: '100px', 
                        display: 'flex', 
                        gap: '0.25rem',
                        border: '1px solid var(--border)',
                        position: 'relative',
                        backdropFilter: 'blur(10px)'
                    }}>
                        {[
                            { id: 'latest', label: 'Latest Publication', icon: 'auto_awesome' },
                            { id: 'oldest', label: 'Default', icon: 'history' },
                            { id: 'alpha_asc', label: 'Thematic A-Z', icon: 'sort_by_alpha' },
                            { id: 'alpha_desc', label: 'Thematic Z-A', icon: 'filter_list' }
                        ].map((opt) => {
                            const isActive = sort === opt.id || (!sort && opt.id === 'latest');
                            return (
                                <Link 
                                    key={opt.id}
                                    href={`/current-issue?sort=${opt.id}`}
                                    style={{
                                        padding: '0.85rem 1.75rem',
                                        borderRadius: '100px',
                                        fontSize: '0.8rem',
                                        fontWeight: 800,
                                        textDecoration: 'none',
                                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        background: 'transparent',
                                        color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                                        position: 'relative',
                                        zIndex: 2
                                    }}
                                >
                                    <span className="material-icon" style={{ 
                                        fontSize: '1.2rem',
                                        color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                                        transition: 'all 0.4s ease'
                                    }}>{opt.icon}</span>
                                    <span style={{ letterSpacing: '0.5px' }}>{opt.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) 1fr', gap: '6rem' }}>
                    <div className="toc-section">
                       <h2 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--text-muted)', marginBottom: '4rem', fontWeight: 900, borderLeft: '4px solid var(--accent)', paddingLeft: '1.5rem' }}>
                          Manuscript Table of Contents
                       </h2>
                       <ScholarlyArticlesList articles={articles} />
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
                </div>
            </div>
        </section>
    </main>
  );
}
