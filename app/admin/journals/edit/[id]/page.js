import { connectDB } from '../../../../../lib/db';
import Journal from '../../../../../lib/models/Journal';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import RichTextEditor from '@/app/components/RichTextEditor';

export default async function EditJournalPage({ params }) {
  const { id } = await params;
  
  await connectDB();
  const journal = await Journal.findById(id).lean();

  if (!journal) {
    return <div style={{ padding: '2rem' }}>Journal not found.</div>;
  }

  async function updateJournal(formData) {
    'use server';
    await connectDB();

    const updateData = {
      topic: formData.get('topic'),
      authors: formData.get('authors'),
      affiliations: formData.get('affiliations'),
      abstract: formData.get('abstract'),
      body: formData.get('body'),
      citation: formData.get('citation'),
      keywords: formData.get('keywords'),
      slug: formData.get('slug'),
      volume: formData.get('volume'),
      issue: formData.get('issue'),
      page: formData.get('page'),
      pdf_path: formData.get('pdf_path'),
      published_date: formData.get('published_date') ? new Date(formData.get('published_date')) : null,
    };

    await Journal.findByIdAndUpdate(id, updateData);
    redirect('/admin/journals');
  }

  // Format date for the HTML date input if it exists
  const publishedDateValue = journal.published_date 
    ? new Date(journal.published_date).toISOString().split('T')[0] 
    : '';

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <Link href="/admin/journals" className="admin-btn admin-btn-outline">← Back</Link>
        <h1 className="admin-page-title" style={{ margin: 0 }}>Edit Journal: {journal.topic?.substring(0, 40)}...</h1>
      </div>

      <div className="admin-card">
        <form action={updateJournal} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label className="admin-label">Topic / Title (Required)</label>
              <input type="text" name="topic" defaultValue={journal.topic} className="admin-input" required />
            </div>

            <div>
              <label className="admin-label">URL Slug (Required)</label>
              <input type="text" name="slug" defaultValue={journal.slug} className="admin-input" required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label className="admin-label">Authors</label>
              <input type="text" name="authors" defaultValue={journal.authors} className="admin-input" />
            </div>

            <div>
              <label className="admin-label">Affiliations</label>
              <input type="text" name="affiliations" defaultValue={journal.affiliations} className="admin-input" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label className="admin-label">Volume</label>
              <input type="number" name="volume" defaultValue={journal.volume} className="admin-input" />
            </div>

            <div>
              <label className="admin-label">Issue</label>
              <input type="number" name="issue" defaultValue={journal.issue} className="admin-input" />
            </div>

            <div>
              <label className="admin-label">Pages</label>
              <input type="text" name="page" defaultValue={journal.page} className="admin-input" placeholder="e.g. 15-27" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label className="admin-label">Published Date</label>
              <input type="date" name="published_date" defaultValue={publishedDateValue} className="admin-input" />
            </div>

            <div>
              <label className="admin-label">Keywords (Comma separated)</label>
              <input type="text" name="keywords" defaultValue={journal.keywords} className="admin-input" />
            </div>
          </div>

          <div>
             <label className="admin-label">Citation Format</label>
             <input type="text" name="citation" defaultValue={journal.citation} className="admin-input" />
          </div>

          <div>
            <label className="admin-label">PDF Path</label>
            <input type="text" name="pdf_path" defaultValue={journal.pdf_path} className="admin-input" placeholder="e.g. uploads/journal_xyz.pdf" />
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--admin-border)', margin: '1rem 0' }} />

          <div>
            <label className="admin-label">Abstract</label>
            <textarea name="abstract" defaultValue={journal.abstract} className="admin-input" style={{ minHeight: '120px', resize: 'vertical' }}></textarea>
          </div>

          <div>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <label className="admin-label">Full Body</label>
             </div>
             <div style={{ marginTop: '0.5rem' }}>
                <RichTextEditor name="body" initialValue={journal.body} />
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
