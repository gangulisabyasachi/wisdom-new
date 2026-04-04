import Link from 'next/link';
import { connectDB } from '../../lib/db';
import Journal from '../../lib/models/Journal';

export const metadata = {
  title: 'Current Issue - WISDOM Journal',
  description: 'Latest double-blinded peer-reviewed research articles published in WISDOM Journal.',
};

export const revalidate = 60;

export default async function CurrentIssuePage() {
  let current_volume = 1;
  let current_issue = 1;
  let published_month = '';
  let editor = 'Prof Dr. S S Chatterji';
  
  let articles = [];

  try {
    await connectDB();

    // Find the latest volume and issue
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
  // Calculate pages end based on data
  let pages_end = 0;
  articles.forEach(art => {
    if (!art.page) return;
    const match = art.page.match(/-(\d+)$/);
    if (match) {
      const endPage = parseInt(match[1]);
      if (endPage > pages_end) pages_end = endPage;
    } else {
      const singlePage = parseInt(art.page);
      if (!isNaN(singlePage) && singlePage > pages_end) pages_end = singlePage;
    }
  });

  return (
    <main>
        <section className="page-header">
            <div className="container">
                <h1>Current Issue</h1>
                <p>
                    Volume {current_volume}, Issue {current_issue}
                    - Latest double-blinded peer-reviewed research articles
                </p>
            </div>
        </section>
        <section className="content-section">
            <div className="container">
                {/* Issue Info */}
                <div className="content-card" style={{ marginBottom: '2rem', fontSize: '14px' }}>
                    <h2>Volume {current_volume}, Issue {current_issue}</h2>
                    <div className="issue-info" style={{ marginTop: '1rem' }}>
                        <p style={{ margin: '0.5rem 0', fontSize: '0.95rem' }}><strong style={{ color: '#1e40af' }}>Published:</strong> {published_month}</p>
                        <p style={{ margin: '0.5rem 0', fontSize: '0.95rem' }}><strong style={{ color: '#1e40af' }}>Editor-in-Chief:</strong> {editor}</p>
                        <p style={{ margin: '0.5rem 0', fontSize: '0.95rem' }}><strong style={{ color: '#1e40af' }}>Total Articles:</strong> {total_articles}</p>
                        <p style={{ margin: '0.5rem 0', fontSize: '0.95rem' }}><strong style={{ color: '#1e40af' }}>Pages:</strong> 1–{pages_end}</p>
                    </div>
                </div>

                {/* Articles */}
                <div className="articles-list">
                    <h3 style={{ marginBottom: '2rem', color: '#1e293b' }}>Research Articles</h3>
                    {articles.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#666' }}>No articles published in this issue.</p>
                    ) : (
                        articles.map((art, index) => {
                            const authorsArr = art.authors.split(',');
                            const affilsArr = art.affiliations ? art.affiliations.split(/\r?\n|\r/).filter(a => a.trim() !== '') : [];

                            return (
                                <div className="article-card" key={index} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.5rem', marginBottom: '1.5rem', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                    <h4 className="article-title" style={{ marginBottom: '0.75rem' }}>
                                        <Link style={{ color: '#930a17', textDecoration: 'none', fontSize: '1.2rem', fontWeight: '600' }} href={`/${art.slug}`}>
                                            {art.topic}
                                        </Link>
                                    </h4>
                                    <p className="article-authors" style={{ margin: '0.75rem 0', fontSize: '0.95rem' }}>
                                        <strong style={{ color: '#1e40af' }}>Authors:</strong>{' '}
                                        {authorsArr.map((author, i) => (
                                            <span key={i}>
                                                {author.trim()}<sup>{i + 1}</sup>
                                                {i < authorsArr.length - 1 ? ', ' : ''}
                                            </span>
                                        ))}
                                    </p>
                                    <p className="article-affiliations" style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6' }}>
                                        <small>
                                            {affilsArr.map((affil, i) => (
                                                <span key={i}>
                                                    <sup>{i + 1}</sup>{affil}<br />
                                                </span>
                                            ))}
                                        </small>
                                    </p>
                                    <p className="article-pages" style={{ margin: '0.75rem 0', fontSize: '0.95rem' }}>
                                        <strong style={{ color: '#1e40af' }}>Pages:</strong> {art.page}
                                    </p>
                                    <p className="article-abstract" style={{ margin: '0.75rem 0', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                        <strong style={{ color: '#1e40af' }}>Abstract:</strong> {art.abstract}
                                    </p>
                                    {art.keywords && (
                                        <p className="article-keywords" style={{ margin: '0.75rem 0', fontSize: '0.95rem' }}>
                                            <strong style={{ color: '#1e40af' }}>Keywords:</strong> {art.keywords}
                                        </p>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    </main>
  );
}
