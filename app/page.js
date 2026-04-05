import Link from 'next/link';
import { connectDB } from '../lib/db';
import Journal from '../lib/models/Journal';
import Announcement from '../lib/models/Announcement';
import Typewriter from './components/Typewriter';

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
            citation: a.published_date ? new Date(a.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '',
        }));

        // Fetch latest 2 announcements
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
                <div className="container hero-content reveal">
                    <h1 className="hero-title">
                        {/* Unlocking <span style={{ color: 'var(--accent)' }}>Wisdom</span> through Global Research. */}
                        Unlocking <Typewriter text="WISDOM" /> <br></br>through Global Research.

                    </h1>
                    <p className="hero-description">
                        A premier multidisciplinary research journal fostering scholarly excellence across sciences, law, management, and social impact research.
                    </p>

                    <div className="issn-box">
                        <div className="issn-placeholder">ISSN (P): 3108-0499</div>
                        <div className="issn-placeholder">ISSN (E): 3108-351X</div>
                    </div>

                    <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link href="/call-for-papers" className="btn btn-primary">Submit Original Paper</Link>
                        <Link href="/current-issue" className="btn" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', fontWeight: 600 }}>Explore Latest Issue</Link>
                    </div>
                </div>
            </section>

            <section className="publisher-info">
                <div className="container">
                    <div className="publisher-grid">
                        <div className="publisher-text reveal">
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
                                        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>80+</div>
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
                        </div>
                        <div className="publisher-image reveal" style={{ animationDelay: '0.2s' }}>
                            <img src="/images/logo.jpeg" alt="Wisdom Journal Academic Building" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="highlights">
                <div className="container">
                    <h2 className="section-title" style={{ textAlign: 'center' }}>Scholarly Foundations</h2>
                    <div className="highlights-grid">
                        <div className="highlight-card reveal">
                            <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>📖</div>
                            <h3>Rigorous Peer Review</h3>
                            <p>Our double-blinded review process ensures every published manuscript meets high academic integrity.</p>
                        </div>
                        <div className="highlight-card reveal" style={{ animationDelay: '0.1s' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>🌐</div>
                            <h3>Limitless Scope</h3>
                            <p>From Social Sciences and Law to Applied Sciences and Global Management Research.</p>
                        </div>
                        <div className="highlight-card reveal" style={{ animationDelay: '0.2s' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>⚡</div>
                            <h3>Impact & Access</h3>
                            <p>Every article is published under CC BY 4.0, maximizing reach and collaborative potential.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="journal-updates-beauty">
                <div className="container">
                    <div className="updates-columns">

                        <div className="beauty-column reveal">
                            <h2 className="section-title">Latest Announcements</h2>
                            <div className="announcement-list">
                                {announcements.length > 0 ? (
                                    announcements.map((ann) => (
                                        <div key={ann.id} className="beauty-card">
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
                                {/* <Link href="/archives" className="btn" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', width: '100%', textAlign: 'center' }}>
                            Browse News Archive
                          </Link> */}
                            </div>
                        </div>

                        <div className="beauty-column reveal" style={{ animationDelay: '0.2s' }}>
                            <h2 className="section-title">Recent Articles</h2>
                            <div className="articles-list">
                                {recent_articles.length > 0 ? (
                                    recent_articles.map((art, idx) => (
                                        <article key={idx} className="beauty-card">
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
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
