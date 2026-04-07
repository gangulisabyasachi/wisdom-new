import Link from 'next/link';
import { connectDB } from '../lib/db';
import Journal from '../lib/models/Journal';
import Announcement from '../lib/models/Announcement';
import Typewriter from './components/Typewriter';
import TiltImage from './components/TiltImage';
import ScrollReveal from './components/ScrollReveal';
import ParallaxElement from './components/ParallaxElement';

export const metadata = {
  // ... (metadata remains unchanged)
};

export const revalidate = 60;

export default async function Home() {
    // ...
    let recent_articles = [];
    let announcements = [];
    let paperCount = 0;

    try {
        await connectDB();
        paperCount = await Journal.countDocuments({});
        const rawArticles = await Journal.find({}).sort({ published_date: -1 }).limit(2).lean();
        recent_articles = rawArticles.map(a => ({
            topic: a.topic || '',
            slug: a.slug || '',
            authors: a.authors || '',
            abstract: a.abstract || '',
            citation: a.published_date ? new Date(a.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '',
        }));

        const rawAnn = await Announcement.find({}).sort({ announcement_date: -1 }).limit(2).lean();
        announcements = rawAnn.map(a => {
            let cleanText = (a.body || "").replace(/<[^>]*>?/gm, '');
            return {
                id: a.legacy_id ? a.legacy_id.toString() : a._id.toString(),
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
            <section className="hero">
                <ParallaxElement speed={0.15}>
                  <ScrollReveal direction="up" delay={0.2}>
                    <div className="container hero-content">
                        <h1 className="hero-title">
                            Unlocking <Typewriter text="WISDOM" /> <br></br>through Global Research.
                        </h1>
                        <p className="hero-subtitle">Celebrating over 15 years of academic excellence and multidisciplinary knowledge exchange.</p>
                        <div className="hero-btns">
                            <Link href="/archives" className="btn btn-primary">Browse Archives</Link>
                            <Link href="/current-issue" className="btn" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', fontWeight: 600 }}>Explore Latest Issue</Link>
                        </div>
                    </div>
                  </ScrollReveal>
                </ParallaxElement>

                <div className="scroll-indicator-wrapper">
                    <a href="#academic-advancements" className="scroll-indicator" aria-label="Scroll to discover more">
                        <span className="scroll-text">DISCOVER MORE</span>
                        <div className="mouse">
                            <div className="wheel"></div>
                        </div>
                        <div className="scroll-arrow-icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </a>
                </div>
            </section>

            <section id="academic-advancements" className="publisher-info">
                <div className="container">
                    <div className="publisher-grid">
                        <div className="publisher-text">
                            <ScrollReveal direction="left" delay={0.1}>
                              <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>A Multi-Disciplinary Platform</span>
                              <h2 className="section-title" style={{ marginTop: '1rem' }}>Advancing the Global Scholar Community</h2>
                              <div className="publisher-card">
                                  <p>
                                      WISDOM is a double-blinded peer-reviewed research platform dedicated to the dissemination of
                                      rigorous evidence-based studies across diverse scholastic fields.
                                  </p>
                                  <p>
                                      Guided by an esteemed editorial board, we uphold the highest standards of academic integrity,
                                      offering open-access content to ensure scientific knowledge remains a public good.
                                  </p>
                                  <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1.5rem 0' }} />
                                  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                      <div style={{ textAlign: 'center' }}>
                                          <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{paperCount}</div>
                                          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Papers Published</div>
                                      </div>
                                      <div style={{ textAlign: 'center' }}>
                                          <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>15+</div>
                                          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Global Experts</div>
                                      </div>
                                      <div style={{ textAlign: 'center' }}>
                                          <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>100%</div>
                                          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Open Access</div>
                                      </div>
                                  </div>
                              </div>
                            </ScrollReveal>
                        </div>
                        <div className="publisher-image">
                            <ScrollReveal direction="right" delay={0.3}>
                              <ParallaxElement speed={-0.05} className="mascot-parallax">
                                <TiltImage src="/images/logo.jpeg" alt="Wisdom Journal Academic Building" />
                              </ParallaxElement>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            <section className="highlights">
                <div className="container">
                    <ScrollReveal direction="up" delay={0.1}>
                      <h2 className="section-title" style={{ textAlign: 'center' }}>Scholarly Foundations</h2>
                    </ScrollReveal>
                    <div className="highlights-grid">
                        <ScrollReveal direction="up" delay={0.2} className="stagger-1">
                          <div className="highlight-card">
                              <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>📖</div>
                              <h3>Rigorous Peer Review</h3>
                              <p>Our double-blinded review process ensures every published manuscript meets high academic integrity.</p>
                          </div>
                        </ScrollReveal>
                        <ScrollReveal direction="up" delay={0.3} className="stagger-2">
                          <div className="highlight-card">
                              <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>🌐</div>
                              <h3>Limitless Scope</h3>
                              <p>From Social Sciences and Law to Applied Sciences and Global Management Research.</p>
                          </div>
                        </ScrollReveal>
                        <ScrollReveal direction="up" delay={0.4} className="stagger-3">
                          <div className="highlight-card">
                              <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>⚡</div>
                              <h3>Impact & Access</h3>
                              <p>Every article is published under CC BY 4.0, maximizing reach and collaborative potential.</p>
                          </div>
                        </ScrollReveal>
                    </div>

                    <ScrollReveal direction="up" delay={0.5}>
                        <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                             <Link href="/peer-review-policy" className="policy-link-pill">Peer Review Integrity &rarr;</Link>
                             <Link href="/cope-ethics" className="policy-link-pill">Publication Ethics &rarr;</Link>
                             <Link href="/open-access-policy" className="policy-link-pill">Open Access Commitment &rarr;</Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <section className="journal-updates-beauty">
                <div className="container">
                    <div className="updates-columns">
                        <div className="beauty-column">
                            <ScrollReveal direction="left" delay={0.2}>
                              <h2 className="section-title">Latest Announcements</h2>
                              <div className="announcement-list">
                                  {announcements.length > 0 ? (
                                      announcements.map((ann, i) => (
                                          <div key={ann.id} className={`beauty-card stagger-${i+1}`}>
                                              <div className="date">{ann.announcement_date}</div>
                                              <h3 style={{ marginTop: '0.5rem' }}>{ann.title}</h3>
                                              <div className="announcement-preview" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', color: 'var(--text-secondary)', fontSize: '0.95rem', margin: '0.75rem 0' }}>
                                                  {ann.preview}
                                              </div>
                                              <Link href={`/announcement/${ann.id}`} style={{ fontWeight: 700, color: 'var(--accent)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                  Read Full Article <span>&rarr;</span>
                                              </Link>
                                          </div>
                                      ))
                                  ) : (
                                      <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '1rem' }}>
                                          No active announcements.
                                      </p>
                                  )}
                              </div>
                            </ScrollReveal>
                        </div>

                        <div className="beauty-column">
                            <ScrollReveal direction="right" delay={0.3}>
                              <h2 className="section-title">Recent Articles</h2>
                              <div className="articles-list">
                                  {recent_articles.length > 0 ? (
                                      recent_articles.map((art, idx) => (
                                          <article key={idx} className={`beauty-card stagger-${idx+1}`}>
                                              <p className="authors">{art.authors}</p>
                                              <h3>
                                                  <Link href={`/${art.slug}`}>
                                                      {art.topic}
                                                  </Link>
                                              </h3>
                                              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '1rem 0' }}>
                                                  {art.abstract.substring(0, 140)}...
                                              </p>
                                              <div className="date">{art.citation}</div>
                                          </article>
                                      ))
                                  ) : (
                                      <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '1rem' }}>
                                          Scientific database loading...
                                      </p>
                                  )}
                                  <Link href="/current-issue" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                                      Explore Research Dashboard
                                  </Link>
                              </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
