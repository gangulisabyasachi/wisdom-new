import { connectDB } from '../../../../lib/db';
import Journal from '../../../../lib/models/Journal';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import RichTextEditor from '@/app/components/RichTextEditor';

export default async function AddJournalPage() {

  async function createJournal(formData) {
    'use server';
    await connectDB();

    const newJournalData = {
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
      status: 'published' // Default
    };

    await Journal.create(newJournalData);
    redirect('/admin/journals');
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <Link href="/admin/journals" className="admin-btn admin-btn-outline">← Back</Link>
        <h1 className="admin-page-title" style={{ margin: 0 }}>Add New Journal</h1>
      </div>

      <div className="admin-card">
        <form action={createJournal} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label className="admin-label">Topic / Title (Required)</label>
              <input type="text" name="topic" className="admin-input" required />
            </div>

            <div>
              <label className="admin-label">URL Slug (Required)</label>
              <input type="text" name="slug" className="admin-input" placeholder="e.g. impact-of-ai-2026" required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label className="admin-label">Authors</label>
              <input type="text" name="authors" className="admin-input" placeholder="John Doe, Jane Smith" />
            </div>

            <div>
              <label className="admin-label">Affiliations</label>
              <input type="text" name="affiliations" className="admin-input" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label className="admin-label">Volume</label>
              <input type="number" name="volume" className="admin-input" />
            </div>

            <div>
              <label className="admin-label">Issue</label>
              <input type="number" name="issue" className="admin-input" />
            </div>

            <div>
              <label className="admin-label">Pages</label>
              <input type="text" name="page" className="admin-input" placeholder="e.g. 15-27" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label className="admin-label">Published Date</label>
              <input type="date" name="published_date" className="admin-input" />
            </div>

            <div>
              <label className="admin-label">Keywords (Comma separated)</label>
              <input type="text" name="keywords" className="admin-input" />
            </div>
          </div>

          <div>
             <label className="admin-label">Citation Format</label>
             <input type="text" name="citation" className="admin-input" />
          </div>

          <div>
            <label className="admin-label">PDF Path</label>
            <input type="text" name="pdf_path" className="admin-input" placeholder="e.g. uploads/journal_xyz.pdf" />
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--admin-border)', margin: '1rem 0' }} />

          <div>
            <label className="admin-label">Abstract</label>
            <textarea name="abstract" className="admin-input" style={{ minHeight: '120px', resize: 'vertical' }}></textarea>
          </div>

          <div>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <label className="admin-label">Full Body</label>
             </div>
             <div style={{ marginTop: '0.5rem' }}>
                <RichTextEditor name="body" />
             </div>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
             <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: '0.75rem 2.5rem', fontSize: '1rem' }}>
               Create Journal
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
