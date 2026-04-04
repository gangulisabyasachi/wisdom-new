import { connectDB } from '../../../lib/db';
import Announcement from '../../../lib/models/Announcement';
import Link from 'next/link';

export default async function AdminAnnouncementsPage() {
  await connectDB();
  const announcements = await Announcement.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 className="admin-page-title" style={{ margin: 0 }}>Announcements Manager</h1>
        <Link href="/admin/announcements/add" className="admin-btn admin-btn-primary">+ Add Announcement</Link>
      </div>

      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Announcement Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map(ann => (
                <tr key={ann._id.toString()}>
                  <td style={{ fontWeight: 500, maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {ann.title}
                  </td>
                  <td style={{ color: 'var(--admin-text-secondary)' }}>
                    {ann.announcement_date ? new Date(ann.announcement_date).toLocaleDateString() : 'N/A'}
                  </td>
                  <td>
                    <Link href={`/admin/announcements/edit/${ann._id}`} className="admin-btn" style={{ border: '1px solid var(--admin-border)', marginRight: '0.5rem' }}>
                      Edit
                    </Link>
                    <form action={`/admin/announcements/delete`} method="POST" style={{ display: 'inline-block' }}>
                      <input type="hidden" name="id" value={ann._id.toString()} />
                      <button type="submit" className="admin-btn" style={{ border: '1px solid var(--admin-danger)', color: 'var(--admin-danger)' }}>
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {announcements.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '2rem' }}>No announcements found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
