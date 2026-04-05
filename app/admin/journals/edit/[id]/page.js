import { connectDB } from '../../../../../lib/db';
import Journal from '../../../../../lib/models/Journal';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import RichTextEditor from '@/app/components/RichTextEditor';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export default async function EditJournalPage({ params }) {
  const { id } = await params;
  
  await connectDB();
  const journal = await Journal.findById(id).lean();

  if (!journal) {
    return <div className="admin-card" style={{ padding: '4rem', textAlign: 'center' }}>Manuscript Record Not Found.</div>;
  }

  async function updateJournal(formData) {
    'use server';
    await connectDB();

    const topic = formData.get('topic');
    const slug = formData.get('slug');
    const pdfFile = formData.get('pdf_file');
    let pdfPath = formData.get('pdf_header_path') || formData.get('pdf_path'); // Fallback

    // 📂 Handle Optional PDF Re-upload
    if (pdfFile && pdfFile.size > 0) {
      try {
        const bytes = await pdfFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadDir, { recursive: true });

        const fileName = `${slug || 'manuscript'}-${Date.now()}.pdf`;
        const path = join(uploadDir, fileName);
        await writeFile(path, buffer);
        
        pdfPath = `/uploads/${fileName}`;
      } catch (err) {
        console.error("PDF Re-upload Failed:", err);
      }
    }

    const updateData = {
      topic,
      authors: formData.get('authors'),
      affiliations: formData.get('affiliations'),
      abstract: formData.get('abstract'),
      body: formData.get('body'),
      citation: formData.get('citation'),
      keywords: formData.get('keywords'),
      doi: formData.get('doi'), 
      slug,
      volume: formData.get('volume'),
      issue: formData.get('issue'),
      page: formData.get('page'),
      pdf_path: pdfPath, 
      published_date: formData.get('published_date') ? new Date(formData.get('published_date')) : null,
    };

    await Journal.findByIdAndUpdate(id, updateData);
    redirect('/admin/journals');
  }

  const publishedDateValue = journal.published_date 
    ? new Date(journal.published_date).toISOString().split('T')[0] 
    : '';

  return (
    <div className="reveal" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2.5rem', gap: '1.5rem' }}>
        <Link href="/admin/journals" className="admin-btn admin-btn-outline">← Back</Link>
        <h1 className="admin-page-title" style={{ margin: 0 }}>Edit Manuscript: {journal.topic?.substring(0, 30)}...</h1>
      </div>

      <div className="admin-card">
        <form action={updateJournal} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <label className="admin-label">Topic / Title (Required)</label>
              <input type="text" name="topic" defaultValue={journal.topic} className="admin-input" required />
            </div>

            <div>
              <label className="admin-label">URL Slug (Required)</label>
              <input type="text" name="slug" defaultValue={journal.slug} className="admin-input" required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <label className="admin-label">Authors</label>
              <input type="text" name="authors" defaultValue={journal.authors} className="admin-input" />
            </div>

            <div>
              <label className="admin-label">Affiliations</label>
              <input type="text" name="affiliations" defaultValue={journal.affiliations} className="admin-input" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
            <div>
              <label className="admin-label">Volume</label>
              <input type="number" name="volume" defaultValue={journal.volume} className="admin-input" />
            </div>

            <div>
              <label className="admin-label">Issue</label>
              <input type="number" name="issue" defaultValue={journal.issue} className="admin-input" />
            </div>

            <div>
              <label className="admin-label">Pagination Range</label>
              <input type="text" name="page" defaultValue={journal.page} className="admin-input" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
            <div>
              <label className="admin-label">Published Date</label>
              <input type="date" name="published_date" defaultValue={publishedDateValue} className="admin-input" />
            </div>

            <div>
              <label className="admin-label">Keywords (Comma separated)</label>
              <input type="text" name="keywords" defaultValue={journal.keywords} className="admin-input" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <label className="admin-label">DOI String (Unique)</label>
              <input type="text" name="doi" defaultValue={journal.doi} className="admin-input" placeholder="e.g. 10.1234/..." />
            </div>

            <div>
              <label className="admin-label">Manual Citation (Optional)</label>
              <input type="text" name="citation" defaultValue={journal.citation} className="admin-input" />
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--admin-border)', margin: '1rem 0' }} />

          <div>
            <label className="admin-label">Replace Manuscript PDF (Optional)</label>
            <div className="admin-file-wrapper">
               <input type="file" name="pdf_file" accept=".pdf" className="admin-file-input" />
               <div className="admin-file-label">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  <span>Click to replace current PDF</span>
                  <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>Current: <code style={{ color: 'var(--admin-primary)' }}>{journal.pdf_path || 'None indexed'}</code></span>
               </div>
            </div>
            <input type="hidden" name="pdf_path" defaultValue={journal.pdf_path} />
          </div>

          <div>
            <label className="admin-label">Abstract</label>
            <textarea name="abstract" defaultValue={journal.abstract} className="admin-input" style={{ minHeight: '150px', resize: 'vertical' }}></textarea>
          </div>

          <div>
             <label className="admin-label">Full Manuscript Body / Preview</label>
             <div style={{ marginTop: '0.75rem' }}>
                <RichTextEditor name="body" initialValue={journal.body} />
             </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--admin-border)', paddingTop: '2.5rem' }}>
             <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: '1rem 4rem', fontSize: '1.1rem' }}>
               Save Scholarly Changes
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
