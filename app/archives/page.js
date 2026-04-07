import Link from 'next/link';
import { connectDB } from '../../lib/db';
import Journal from '../../lib/models/Journal';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import ScholarlyArticlesList from '../components/ScholarlyArticlesList';

export const metadata = {
  title: 'Archives | All Volumes & Issues - WISDOM Journal',
  description: 'Browse all published volumes and issues of WISDOM Journal. Access double-blinded peer-reviewed research articles from multidisciplinary fields in law, social sciences, humanities, management, science, and technology.',
  keywords: 'WISDOM journal archives, past issues, research articles by volume, academic journal archives, multidisciplinary research papers, WISDOM published issues',
  alternates: {
    canonical: 'https://www.wisdomj.in/archives',
  },
  openGraph: {
    title: 'Archives | WISDOM Journal',
    description: 'Explore the complete archive of WISDOM Journal, including all published volumes, issues, and multidisciplinary peer-reviewed research articles.',
    url: 'https://www.wisdomj.in/archives',
    siteName: 'WISDOM Journal',
    images: [
      {
        url: '/images/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'WISDOM Journal Archives – Volumes, Issues, and Peer-Reviewed Research',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  other: {
    'citation_journal_title': 'WISDOM',
    'citation_publisher': 'Jayasree Publications',
    'dc.title': 'Archives - WISDOM Journal',
    'dc.description': 'Complete archive of all published volumes and issues of WISDOM multidisciplinary double-blinded peer-reviewed journal.',
    'dc.publisher': 'Jayasree Publications',
    'dc.language': 'en',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const revalidate = 60;

export default async function ArchivesPage({ searchParams }) {
  const { vol, issue } = await searchParams;
  
  let volumes = [];
  let selectedArticles = [];
  let currentSelectionTitle = "Full Repository Index";

  try {
    await connectDB();
    
    // 1. Fetch ALL distinct Volume/Issue combinations to build the selector
    const allIssueData = await Journal.aggregate([
      { $group: { 
          _id: { vol: "$volume", issue: "$issue" }, 
          count: { $sum: 1 },
          date: { $first: "$published_date" }
        } 
      },
      { $sort: { "_id.vol": -1, "_id.issue": -1 } }
    ]);

    // Group issues by Volume for the selector UI
    const volMap = {};
    allIssueData.forEach(item => {
      const v = item._id.vol || 1;
      const i = item._id.issue || 1;
      if (!volMap[v]) volMap[v] = { number: v, issues: [] };
      volMap[v].issues.push({
        number: i,
        count: item.count,
        date: item.date ? new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'N/A'
      });
    });
    volumes = Object.values(volMap).sort((a,b) => b.number - a.number);

    // 2. Fetch articles based on selection
    const filter = {};
    if (vol) {
        filter.volume = parseInt(vol);
        currentSelectionTitle = `Volume ${vol}`;
        if (issue) {
            filter.issue = parseInt(issue);
            currentSelectionTitle += `, Issue ${issue}`;
        }
    }

    const rawArticles = await Journal.find(filter).sort({ volume: -1, issue: -1, page: 1 }).lean();
    selectedArticles = rawArticles.map(a => ({
      topic: a.topic || '',
      slug: a.slug || '',
      authors: a.authors || '',
      page: a.page || '',
      vol: a.volume,
      issue: a.issue,
      abstract: a.abstract || ''
    }));

  } catch (err) {
    console.error("Failed to fetch archives:", err);
  }

  return (
    <main>
        <PageHero>
            <div className="container">
                <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Electronic Repository</div>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Scholarly Archives</h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px' }}>
                    Browse our complete history of peer-reviewed multidisciplinary research by Volume and Issue.
                </p>
            </div>
        </PageHero>

        <section style={{ padding: '4rem 0' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '4rem' }}>
                
                {/* 🧭 SELECTOR SIDEBAR */}
                <aside className="archive-sidebar">
                    <ScrollReveal direction="left" delay={0.1}>
                      <div style={{ position: 'sticky', top: 'calc(var(--nav-height) + 2rem)' }}>
                        <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Index Selection</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                           <Link 
                               href="/archives" 
                               className={`beauty-card ${!vol ? 'active-filter' : ''}`}
                               style={{ margin: 0, padding: '1rem 1.5rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
                            >
                               <span>All Volumes</span>
                               <span>&rarr;</span>
                            </Link>
                           
                           {volumes.map(v => (
                               <div key={v.number} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-secondary)', padding: '0.5rem 0' }}>Volume {v.number}</div>
                                  {v.issues.map(iss => (
                                     <Link 
                                       key={iss.number}
                                       href={`/archives?vol=${v.number}&issue=${iss.number}`}
                                       className={`beauty-card ${vol == v.number && issue == iss.number ? 'active-filter' : ''}`}
                                       style={{ margin: 0, padding: '0.75rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                     >
                                       <span style={{ fontSize: '0.95rem' }}>Issue {iss.number}</span>
                                       <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{iss.count} Papers</span>
                                     </Link>
                                  ))}
                               </div>
                           ))}
                        </div>
                      </div>
                    </ScrollReveal>
                </aside>

                {/* 📚 RESULTS AREA */}
                <div className="archive-results">
                   <ScrollReveal direction="up" delay={0.1}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '2px solid var(--accent)', paddingBottom: '1rem', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif)' }}>{currentSelectionTitle}</h2>
                        <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{selectedArticles.length} manuscripts</span>
                      </div>
                   </ScrollReveal>

                   <ScholarlyArticlesList articles={selectedArticles} />
                </div>
            </div>
        </section>
    </main>
  );
}
