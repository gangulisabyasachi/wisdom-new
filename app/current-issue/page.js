import Link from 'next/link';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import { connectDB } from '../../lib/db';
import Journal from '../../lib/models/Journal';
import JournalRepository from '../components/JournalRepository';

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

        {/* TABLE OF CONTENTS REPOSITORY */}
        <section style={{ padding: '8rem 0' }}>
            <div className="container">
                <JournalRepository initialArticles={articles} />
            </div>
        </section>
    </main>
  );
}
