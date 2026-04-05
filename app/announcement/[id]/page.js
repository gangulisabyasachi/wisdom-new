import Link from 'next/link';
import { connectDB } from '../../../lib/db';
import Announcement from '../../../lib/models/Announcement';
import mongoose from 'mongoose';
import PageHero from '../../components/PageHero';

export default async function AnnouncementPage({ params }) {
  const { id } = await params;

  let title, date, body, link;
  let found = false;

  try {
    await connectDB();
    
    // Attempt logic: Find by legacy_id or _id
    const query = [];
    if (!isNaN(id)) {
      query.push({ legacy_id: Number(id) });
    }
    if (mongoose.isValidObjectId(id)) {
      query.push({ _id: id });
    }

    if (query.length > 0) {
      const ann = await Announcement.findOne({ $or: query }).lean();
      if (ann) {
        title = ann.title || '';
        date = ann.announcement_date ? new Date(ann.announcement_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';
        body = ann.body || '';
        link = ann.link || null;
        found = true;
      }
    }
  } catch (err) {
    console.error("Failed to fetch announcement:", err);
  }

  if (!found) {
    return (
      <main className="container" style={{ padding: '8rem 0', textAlign: 'center', minHeight: '80vh' }}>
        <h1 style={{ fontSize: '4rem', color: 'var(--text-primary)' }}>404</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', fontSize: '1.25rem' }}>The requested announcement does not exist in our historical archive.</p>
        <Link href="/" className="btn btn-primary" style={{ marginTop: '3rem' }}>Return to Academic Portal</Link>
      </main>
    );
  }

  return (
    <main className="reveal">
        {/* Header Section */}
        <PageHero>
            <div className="container">
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '2rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>
                  <Link href="/" style={{ color: 'var(--accent)' }}>Home</Link>
                  <span>/</span>
                  <span>Official Announcement</span>
                </div>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.1', maxWidth: '900px' }}>{title}</h1>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ padding: '0.5rem 1rem', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                        Notice
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                        Issued on <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{date}</span>
                    </div>
                </div>
            </div>
        </PageHero>

        {/* Content Section */}
        <section style={{ padding: '4rem 0 8rem' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '4rem' }}>
                <div className="announcement-main-content">
                    <div className="article-body" style={{ margin: 0, maxWidth: 'none' }}>
                        <div dangerouslySetInnerHTML={{ __html: body }} />
                    </div>

                    {link && (
                        <div style={{ marginTop: '4rem', padding: '3rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Related Resources</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Additional information or submission portals related to this announcement.</p>
                            <a 
                                href={link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-primary"
                                style={{ boxShadow: '0 10px 30px var(--accent-light)' }}
                            >
                                Visit External Link
                            </a>
                        </div>
                    )}

                    <div style={{ marginTop: '4rem', padding: '2rem 0', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'center' }}>
                         <Link href="/" className="nav-link" style={{ fontSize: '1rem', fontWeight: 600 }}>← Back to Repository Home</Link>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="announcement-sidebar">
                   <div style={{ position: 'sticky', top: 'calc(var(--nav-height) + 2rem)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      <div className="beauty-card" style={{ margin: 0 }}>
                        <h4 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Metadata Tracker</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                             <span style={{ color: 'var(--text-secondary)' }}>Status</span>
                             <span style={{ fontWeight: 700, color: '#059669' }}>Active</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                             <span style={{ color: 'var(--text-secondary)' }}>Type</span>
                             <span style={{ fontWeight: 700 }}>Notification</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                             <span style={{ color: 'var(--text-secondary)' }}>Origin</span>
                             <span style={{ fontWeight: 700 }}>Editorial Board</span>
                          </div>
                        </div>
                      </div>

                      <div className="beauty-card" style={{ margin: 0, background: 'var(--accent)', color: 'white' }}>
                        <h4 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>Need Assistance?</h4>
                        <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>If you have questions regarding this announcement, please contact the editorial department.</p>
                        <Link href="/contact" style={{ display: 'block', padding: '0.75rem', background: 'white', color: 'var(--accent)', textAlign: 'center', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.85rem' }}>Contact Support</Link>
                      </div>
                   </div>
                </aside>
            </div>
        </section>
    </main>
  );
}
