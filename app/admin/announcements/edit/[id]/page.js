import { connectDB } from '../../../../../lib/db';
import Announcement from '../../../../../lib/models/Announcement';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import RichTextEditor from '@/app/components/RichTextEditor';

export default async function EditAnnouncementPage({ params }) {
  const { id } = await params;
  
  await connectDB();
  const announcement = await Announcement.findById(id).lean();

  if (!announcement) {
    return <div style={{ padding: '2rem' }}>Announcement not found.</div>;
  }

  async function updateAnnouncement(formData) {
    'use server';
    await connectDB();

    const updateData = {
      title: formData.get('title'),
      body: formData.get('body'),
      announcement_date: formData.get('announcement_date') ? new Date(formData.get('announcement_date')) : null,
    };

    await Announcement.findByIdAndUpdate(id, updateData);
    redirect('/admin/announcements');
  }

  // Format date for the HTML date input if it exists
  const announcementDateValue = announcement.announcement_date 
    ? new Date(announcement.announcement_date).toISOString().split('T')[0] 
    : '';

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <Link href="/admin/announcements" className="admin-btn admin-btn-outline">← Back</Link>
        <h1 className="admin-page-title" style={{ margin: 0 }}>Edit Announcement</h1>
      </div>

      <div className="admin-card">
        <form action={updateAnnouncement} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div>
            <label className="admin-label">Announcement Title (Required)</label>
            <input type="text" name="title" defaultValue={announcement.title} className="admin-input" required />
          </div>

          <div>
            <label className="admin-label">Date</label>
            <input type="date" name="announcement_date" defaultValue={announcementDateValue} className="admin-input" />
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--admin-border)', margin: '1rem 0' }} />

          <div>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <label className="admin-label">Announcement Body</label>
             </div>
             <div style={{ marginTop: '0.5rem' }}>
                <RichTextEditor name="body" initialValue={announcement.body} />
             </div>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
             <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: '0.75rem 2.5rem', fontSize: '1rem' }}>
               Save Changes
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
