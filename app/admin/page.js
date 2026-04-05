import { connectDB } from '../../lib/db';
import Journal from '../../lib/models/Journal';
import Announcement from '../../lib/models/Announcement';
import User from '../../lib/models/User';
import Link from 'next/link';

export default async function AdminDashboard() {
  await connectDB();
  
  const journalCount = await Journal.countDocuments();
  const announcementCount = await Announcement.countDocuments();
  const userCount = await User.countDocuments();

  // Get recent 5 articles
  const recentJournals = await Journal.find({}).sort({ createdAt: -1 }).limit(5).lean();

  return (
    <div>
      <h1 className="admin-page-title">Dashboard Overview</h1>
      
      <div className="admin-dashboard-grid reveal">
        
        <div className="admin-stat-card blue">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h3 className="admin-stat-title">Published Journals</h3>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          </div>
          <div className="admin-stat-value">{journalCount}</div>
          <p style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)', fontWeight: 700 }}>Total scholarly manuscripts</p>
        </div>

        <div className="admin-stat-card green">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h3 className="admin-stat-title">Active News</h3>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5"><path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2z"></path><path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2z"></path></svg>
          </div>
          <div className="admin-stat-value">{announcementCount}</div>
          <p style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)', fontWeight: 700 }}>Public editorial announcements</p>
        </div>

        <div className="admin-stat-card crimson">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h3 className="admin-stat-title">System Editors</h3>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9f1239" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div className="admin-stat-value">{userCount}</div>
          <p style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)', fontWeight: 700 }}>Authorized portal accounts</p>
        </div>
      </div>

      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Recently Added Journals</h2>
          <Link href="/admin/journals" className="admin-btn admin-btn-primary" style={{ padding: '0.5rem 1rem' }}>View All</Link>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Topic</th>
                <th>Volume / Issue</th>
                <th>Authors</th>
                <th>Date Added</th>
              </tr>
            </thead>
            <tbody>
              {recentJournals.length > 0 ? (
                recentJournals.map((journal) => (
                  <tr key={journal._id.toString()}>
                    <td style={{ fontWeight: 500 }}>{journal.topic?.substring(0, 50)}...</td>
                    <td>V{journal.volume} / I{journal.issue}</td>
                    <td style={{ color: 'var(--admin-text-secondary)' }}>{journal.authors?.substring(0, 30)}...</td>
                    <td style={{ color: 'var(--admin-text-secondary)' }}>{new Date(journal.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', color: 'var(--admin-text-secondary)' }}>No journals found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
