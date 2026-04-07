import Link from 'next/link';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import { connectDB } from '../../lib/db';
import Journal from '../../lib/models/Journal';

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

export default async function CurrentIssuePage() {
  let current_volume = 1;
  let current_issue = 1;
  let published_month = '';
  
  let articles = [];

  try {
    await connectDB();

    const latestArticle = await Journal.findOne().sort({ volume: -1, issue: -1 }).lean();
    
    if (latestArticle) {
       current_volume = latestArticle.volume || 1;
       current_issue = latestArticle.issue || 1;
       
       const issueArticles = await Journal.find({ volume: current_volume, issue: current_issue })
         .sort({ page: 1, published_date: 1 })
         .lean();
         
       articles = issueArticles.map(a => ({
         topic: a.topic || '',
         slug: a.slug || '',
         authors: a.authors || '',
         affiliations: a.affiliations || '',
         doi: a.doi || '',
         page: a.page || '',
         abstract: a.abstract || '',
         keywords: a.keywords || ''
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
                    <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
                       <div className="beauty-card" style={{ margin: 0, padding: '0.75rem 1.5rem', fontSize: '0.85rem', fontWeight: 800, background: 'var(--bg-card)' }}>
                          {total_articles} Scholarly Papers
                       </div>
                       <div className="beauty-card" style={{ margin: 0, padding: '0.75rem 1.5rem', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent)', borderColor: 'var(--accent)' }}>
                          Double-Blinded Review
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

        {/* TABLE OF CONTENTS */}
        <section style={{ padding: '8rem 0' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) 1fr', gap: '6rem' }}>
                    
                    <div className="toc-section">
                        <ScrollReveal direction="left" delay={0.1}>
                          <h2 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--text-muted)', marginBottom: '4rem', fontWeight: 900, borderLeft: '4px solid var(--accent)', paddingLeft: '1.5rem' }}>
                             Manuscript Table of Contents
                          </h2>
                        </ScrollReveal>

                        {articles.length === 0 ? (
                            <ScrollReveal direction="up" delay={0.2}>
                              <div className="beauty-card" style={{ textAlign: 'center', padding: '4rem' }}>
                                 <p>No manuscripts are indexed for this cycle.</p>
                              </div>
                            </ScrollReveal>
                        ) : (
                            articles.map((art, index) => (
                                <ScrollReveal key={index} direction="up" delay={0.1 * (index % 3)}>
                                  <div className="article-card" style={{ marginBottom: '4rem', borderBottom: '1px solid var(--border)', paddingBottom: '3rem' }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                         <span style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--accent)', letterSpacing: '1px' }}>
                                            {art.doi ? `DOI: ${art.doi}` : `REF: WSD-${index+101}`}
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
