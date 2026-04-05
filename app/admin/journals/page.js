import { connectDB } from '../../../lib/db';
import Journal from '../../../lib/models/Journal';
import Link from 'next/link';

export default async function AdminJournalsPage() {
  await connectDB();
  const journals = await Journal.find({}).sort({ volume: -1, issue: -1, published_date: -1 }).lean();

  return (
    <div className="reveal">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
           <h1 className="admin-page-title" style={{ margin: 0 }}>Journals Manager</h1>
           <p style={{ color: 'var(--admin-text-secondary)', marginTop: '0.5rem', fontWeight: 600 }}>Manage scholarly manuscripts and PDF publications.</p>
        </div>
        <Link href="/admin/journals/add" className="admin-btn admin-btn-primary">
           + Add Manuscript
        </Link>
      </div>

      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Topic / Manuscript</th>
                <th>Edition</th>
                <th>DOI String</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {journals.map(journal => (
                <tr key={journal._id.toString()}>
                  <td style={{ maxWidth: '400px' }}>
                    <div style={{ fontWeight: 800, color: 'var(--admin-text-primary)', marginBottom: '4px' }}>
                       {journal.topic}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-secondary)', fontWeight: 600 }}>
                       {journal.authors?.substring(0, 50)}{journal.authors?.length > 50 ? '...' : ''}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700 }}>Vol {journal.volume}, Issue {journal.issue}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)', fontWeight: 600 }}>{journal.page}</div>
                  </td>
                  <td>
                    {journal.doi ? (
                       <code style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: '#f1f5f9', borderRadius: '4px', color: 'var(--admin-primary)' }}>{journal.doi}</code>
                    ) : (
                       <span style={{ fontSize: '0.75rem', fontStyle: 'italic', color: '#94a3b8' }}>DOI Pending</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link href={`/${journal.slug}`} target="_blank" className="admin-btn admin-btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
                         View Live
                      </Link>
                      <Link href={`/admin/journals/edit/${journal._id}`} className="admin-btn admin-btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
                         Edit
                      </Link>
                      <form action={`/admin/journals/delete`} method="POST" style={{ display: 'inline-block' }}>
                        <input type="hidden" name="id" value={journal._id.toString()} />
                        <button type="submit" className="admin-btn admin-btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {journals.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '4rem', color: 'var(--admin-text-secondary)' }}>
                     No scholarly manuscripts detected in the repository.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
