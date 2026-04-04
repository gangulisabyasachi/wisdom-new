import { connectDB } from '../../../lib/db';
import Journal from '../../../lib/models/Journal';
import Link from 'next/link';

export default async function AdminJournalsPage() {
  await connectDB();
  const journals = await Journal.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 className="admin-page-title" style={{ margin: 0 }}>Journals Manager</h1>
        <Link href="/admin/journals/add" className="admin-btn admin-btn-primary">+ Add Journal</Link>
      </div>

      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Topic</th>
                <th>Volume/Issue</th>
                <th>Authors</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {journals.map(journal => (
                <tr key={journal._id.toString()}>
                  <td style={{ fontWeight: 500, maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {journal.topic}
                  </td>
                  <td>V{journal.volume} / I{journal.issue}</td>
                  <td style={{ color: 'var(--admin-text-secondary)' }}>{journal.authors?.substring(0, 30)}...</td>
                  <td>
                    <Link href={`/admin/journals/edit/${journal._id}`} className="admin-btn" style={{ border: '1px solid var(--admin-border)', marginRight: '0.5rem' }}>
                      Edit
                    </Link>
                    <form action={`/admin/journals/delete`} method="POST" style={{ display: 'inline-block' }}>
                      <input type="hidden" name="id" value={journal._id.toString()} />
                      <button type="submit" className="admin-btn" style={{ border: '1px solid var(--admin-danger)', color: 'var(--admin-danger)' }}>
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {journals.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No journals found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
