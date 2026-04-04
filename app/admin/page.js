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
      
      <div className="admin-dashboard-grid">
        
        <div className="admin-stat-card blue">
          <h3 className="admin-stat-title">Journals Published</h3>
          <div className="admin-stat-value">{journalCount}</div>
        </div>

        <div className="admin-stat-card green">
          <h3 className="admin-stat-title">Announcements</h3>
          <div className="admin-stat-value">{announcementCount}</div>
        </div>

        <div className="admin-stat-card purple">
          <h3 className="admin-stat-title">Registered Users</h3>
          <div className="admin-stat-value">{userCount}</div>
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
