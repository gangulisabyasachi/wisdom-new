import Link from 'next/link';
import { connectDB } from '../lib/db';
import Journal from '../lib/models/Journal';
import Announcement from '../lib/models/Announcement';

export const revalidate = 60;

export default async function Home() {
  let recent_articles = [];
  let announcements = [];

  try {
    await connectDB();
    
    // Fetch latest 2 articles
    const rawArticles = await Journal.find({}).sort({ published_date: -1 }).limit(2).lean();
    recent_articles = rawArticles.map(a => ({
      topic: a.topic || '',
      slug: a.slug || '',
      authors: a.authors || '',
      abstract: a.abstract || '',
      citation: a.citation || (a.published_date ? new Date(a.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''),
    }));

    // Fetch latest 2 announcements
    const rawAnn = await Announcement.find({}).sort({ announcement_date: -1 }).limit(2).lean();
    announcements = rawAnn.map(a => {
      let cleanText = (a.body || "").replace(/<[^>]*>?/gm, '');
      return {
        id: a.legacy_id ? a.legacy_id.toString() : a._id.toString(), // Support legacy_id since URLs might rely on it
        title: a.title,
        announcement_date: a.announcement_date ? new Date(a.announcement_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '',
        preview: cleanText
      };
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }

  return (
    <>
      <section className="hero" data-testid="hero-section">
          <div className="hero-content">
              <h1 className="hero-title" data-testid="text-hero-title">
                  <span className="highlight">WISDOM</span>
              </h1>
              <p className="hero-description" data-testid="text-hero-description">
                  Wisdom is a double-blinded peer-reviewed academic journal that publishes high-quality,
                  multidisciplinary research aimed at advancing knowledge, promoting innovation, and supporting global
                  scholarly excellence.
              </p>
              <div className="issn-box" data-testid="issn-box">
                  <div className="issn-placeholder" data-testid="text-issn-placeholder">ISSN (P): 3108-0499</div>
                  <div className="issn-placeholder" data-testid="text-issn-placeholder">ISSN (E): 3108-351X</div>
              </div>
          </div>
      </section>

      <section className="publisher-info" data-testid="publisher-info-section">
          <div className="container">
              <div className="publisher-grid">
                  <div className="publisher-text">
                      <h2 data-testid="text-publisher-title">WISDOM: A Multidisciplinary Research Journal</h2>
                      <div className="publisher-card">
                          <p>
                              WISDOM is a double-blinded peer-reviewed, multidisciplinary journal dedicated to advancing
                              academic knowledge and promoting cutting-edge research across diverse fields. Serving as
                              a global platform for scholars, researchers, and professionals, it publishes original
                              research articles, critical reviews, and rigorous evidence-based studies.
                          </p>
                          <p>
                              Committed to scholarly excellence, originality, and worldwide relevance, WISDOM fosters
                              cross-disciplinary dialogue, supports intellectual growth, and contributes meaningfully
                              to contemporary research and practice. By offering open-access content, the journal
                              encourages the free exchange of ideas and strengthens the global academic community.
                          </p>
                          <p>Guided by an esteemed editorial board comprised of distinguished academicians from
                              various disciplines, WISDOM remains devoted to upholding the highest standards of
                              academic rigor and integrity.</p>
                      </div>
                  </div>
                  <div className="publisher-image">
                      <img src="/images/logo.jpeg" alt="Logo of Wisdom Journal" data-testid="img-publisher-building" />
                  </div>
              </div>
          </div>
      </section>

      <section className="highlights">
          <div className="container">
              <h2>Journal Highlights</h2>
              <div className="highlights-grid">
                  <div className="highlight-card" data-testid="card-peer-review">
                      <h3>Rigorous Peer Review</h3>
                      <p>Double-blinded peer review process ensuring quality and integrity of published research.</p>
                  </div>
                  <div className="highlight-card" data-testid="card-multidisciplinary">
                      <h3>Multidisciplinary Scope</h3>
                      <p>Covering engineering, sciences, social sciences, medical research, and environmental studies.</p>
                  </div>
                  <div className="highlight-card" data-testid="card-open-access">
                      <h3>Open Access</h3>
                      <p>Providing free access to cutting-edge research findings for the global academic community.</p>
                  </div>
              </div>
          </div>
      </section>

      <section className="journal-updates journal-updates-beauty container">
          <div className="updates-columns">
              <div className="latest-announcements beauty-column">
                  <h2 className="section-title">Latest Announcements</h2>
                  <div className="announcement-list">
                      {announcements.length > 0 ? (
                          announcements.map((ann) => (
                              <div key={ann.id} className="announcement beauty-card">
                                  <h3>{ann.title}</h3>
                                  <p className="date">{ann.announcement_date}</p>
                                  <div className="announcement-preview" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.6, margin: '0.75rem 0'}}>
                                      {ann.preview}
                                  </div>
                                  <Link href={`/announcement/${ann.id}`} className="btn btn-primary">
                                      Read More
                                  </Link>
                              </div>
                          ))
                      ) : (
                          <p style={{ color: '#666', fontStyle: 'italic', textAlign: 'center', padding: '1rem' }}>
                              No announcements at this time.
                          </p>
                      )}
                  </div>
              </div>

              <div className="recent-articles beauty-column">
                  <h2 className="section-title">Recent Articles</h2>
                  <div className="articles-list beauty-articles-list">
                      {recent_articles.length > 0 ? (
                          recent_articles.map((art, idx) => (
                              <article key={idx} className="article-preview beauty-card">
                                  <h3>
                                      <Link href={`/${art.slug}`}>
                                          {art.topic}
                                      </Link>
                                  </h3>
                                  <p className="authors">{art.authors}</p>
                                  <p className="abstract">
                                      {art.abstract.substring(0, 150)}...
                                  </p>
                                  <div className="article-meta">
                                      <span className="date">
                                          {art.citation}
                                      </span>
                                  </div>
                              </article>
                          ))
                      ) : (
                          <p style={{ color: '#666', fontStyle: 'italic', textAlign: 'center', padding: '1rem' }}>
                              No articles published yet.
                          </p>
                      )}
                  </div>
                  <div className="view-all">
                      <Link href="/current-issue" className="btn btn-primary">View All Articles</Link>
                  </div>
              </div>
          </div>
      </section>
    </>
  );
}
