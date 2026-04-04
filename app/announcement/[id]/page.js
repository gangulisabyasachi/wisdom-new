import { connectDB } from '../../../lib/db';
import Announcement from '../../../lib/models/Announcement';
import mongoose from 'mongoose';

export default async function AnnouncementPage({ params }) {
  const { id } = await params;

  let title, date, body;
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
        found = true;
      }
    }
  } catch (err) {
    console.error("Failed to fetch announcement:", err);
  }

  if (!found) {
    return (
      <main className="container" style={{ padding: '6rem 0', textAlign: 'center', minHeight: '60vh' }}>
        <h1 style={{ fontSize: '3rem', color: '#1e293b' }}>404 Not Found</h1>
        <p style={{ color: '#666', marginTop: '1rem' }}>The requested announcement does not exist.</p>
        <a href="/" style={{ display: 'inline-block', margin: '2rem 0', padding: '0.8rem 1.5rem', background: '#1e40af', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>Back to Home</a>
      </main>
    );
  }

  return (
    <main>
      <section className="content-section" style={{ minHeight: '60vh' }}>
        <div className="container">
          <div className="article-content">
            <h1 style={{ marginTop: '2.5rem' }}>{title}</h1>
            
            <div className="article-meta" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.5rem', margin: '1.5rem 0', fontSize: '0.95rem', lineHeight: '1.6' }}>
              <h3 style={{ margin: '0 0 1rem', fontSize: '1.1rem', color: '#1e293b', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.5rem' }}>Announcement Information</h3>
              <div className="meta-item">
                <strong style={{ color: '#1e40af', display: 'inline-block', width: '140px' }}>Issued:</strong> 
                <span style={{ color: '#333' }}>{date}</span>
              </div>
            </div>

            <div className="fulltext-box" style={{ background: '#f0fdf4', borderLeft: '5px solid #930a17', borderRadius: '0 8px 8px 0', padding: '1.5rem', margin: '2rem 0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', fontSize: '1rem', lineHeight: '1.7', color: '#1f2937' }}>
              <h2 style={{ margin: '0 0 1rem', fontSize: '1.3rem', color: '#166534', fontWeight: '600' }}>Full Announcement</h2>
              <div dangerouslySetInnerHTML={{ __html: body }}></div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <a href="/" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: '600' }}>
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
