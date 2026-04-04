import { connectDB } from '../../../../lib/db';
import Announcement from '../../../../lib/models/Announcement';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import RichTextEditor from '@/app/components/RichTextEditor';

export default async function AddAnnouncementPage() {

  async function createAnnouncement(formData) {
    'use server';
    await connectDB();

    const newAnnouncementData = {
      title: formData.get('title'),
      body: formData.get('body'),
      announcement_date: formData.get('announcement_date') ? new Date(formData.get('announcement_date')) : null,
      status: 'active'
    };

    await Announcement.create(newAnnouncementData);
    redirect('/admin/announcements');
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <Link href="/admin/announcements" className="admin-btn admin-btn-outline">← Back</Link>
        <h1 className="admin-page-title" style={{ margin: 0 }}>Add New Announcement</h1>
      </div>

      <div className="admin-card">
        <form action={createAnnouncement} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div>
            <label className="admin-label">Announcement Title (Required)</label>
            <input type="text" name="title" className="admin-input" required />
          </div>

          <div>
            <label className="admin-label">Date</label>
            <input type="date" name="announcement_date" className="admin-input" />
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--admin-border)', margin: '1rem 0' }} />

          <div>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <label className="admin-label">Announcement Body</label>
             </div>
             <div style={{ marginTop: '0.5rem' }}>
                <RichTextEditor name="body" />
             </div>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
             <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: '0.75rem 2.5rem', fontSize: '1rem' }}>
               Create Announcement
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
