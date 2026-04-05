import { connectDB } from '../../../../lib/db';
import Journal from '../../../../lib/models/Journal';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import RichTextEditor from '@/app/components/RichTextEditor';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export default async function AddJournalPage() {

  async function createJournal(formData) {
    'use server';
    await connectDB();

    const topic = formData.get('topic');
    const slug = formData.get('slug');
    const pdfFile = formData.get('pdf_file');
    let pdfPath = formData.get('pdf_path'); // Fallback to manual path if provided

    // 📂 Handle PDF File Upload
    if (pdfFile && pdfFile.size > 0) {
      try {
        const bytes = await pdfFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Ensure uploads directory exists
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadDir, { recursive: true });

        // Clean filename: manuscript-slug.pdf
        const fileName = `${slug || 'manuscript'}-${Date.now()}.pdf`;
        const path = join(uploadDir, fileName);
        await writeFile(path, buffer);
        
        pdfPath = `/uploads/${fileName}`;
        console.log(`[Upload] PDF saved to ${pdfPath}`);
      } catch (err) {
        console.error("PDF Upload Failed:", err);
      }
    }

    const newJournalData = {
      topic,
      authors: formData.get('authors'),
      affiliations: formData.get('affiliations'),
      abstract: formData.get('abstract'),
      body: formData.get('body'),
      citation: formData.get('citation'),
      keywords: formData.get('keywords'),
      doi: formData.get('doi'), // 🔍 MODIFIED: Added DOI
      slug,
      volume: formData.get('volume'),
      issue: formData.get('issue'),
      page: formData.get('page'),
      pdf_path: pdfPath, // 📄 MODIFIED: Uses uploaded path
      published_date: formData.get('published_date') ? new Date(formData.get('published_date')) : null,
      status: 'published'
    };

    await Journal.create(newJournalData);
    redirect('/admin/journals');
  }

  return (
    <div className="reveal" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2.5rem', gap: '1.5rem' }}>
        <Link href="/admin/journals" className="admin-btn admin-btn-outline">← Back</Link>
        <h1 className="admin-page-title" style={{ margin: 0 }}>Add New Manuscript</h1>
      </div>

      <div className="admin-card">
        <form action={createJournal} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* TOPIC & SLUG */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <label className="admin-label">Topic / Title (Required)</label>
              <input type="text" name="topic" className="admin-input" placeholder="Enter scholarly title..." required />
            </div>

            <div>
              <label className="admin-label">URL Slug (Required)</label>
              <input type="text" name="slug" className="admin-input" placeholder="e.g. impact-of-ai-2026" required />
            </div>
          </div>

          {/* AUTHORS & AFFILIATIONS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <label className="admin-label">Authors</label>
              <input type="text" name="authors" className="admin-input" placeholder="John Doe, Jane Smith" />
            </div>

            <div>
              <label className="admin-label">Affiliations</label>
              <input type="text" name="affiliations" className="admin-input" placeholder="University Name, Country" />
            </div>
          </div>

          {/* VOLUME, ISSUE, PAGE */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
            <div>
              <label className="admin-label">Volume</label>
              <input type="number" name="volume" className="admin-input" placeholder="0" />
            </div>

            <div>
              <label className="admin-label">Issue</label>
              <input type="number" name="issue" className="admin-input" placeholder="0" />
            </div>

            <div>
              <label className="admin-label">Pagination Range</label>
              <input type="text" name="page" className="admin-input" placeholder="e.g. 15-27" />
            </div>
          </div>

          {/* METADATA: DATE & KEYWORDS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
            <div>
              <label className="admin-label">Published Date</label>
              <input type="date" name="published_date" className="admin-input" />
            </div>

            <div>
              <label className="admin-label">Keywords (Comma separated)</label>
              <input type="text" name="keywords" className="admin-input" placeholder="AI, Ethics, Law..." />
            </div>
          </div>

          {/* DOI & CITATION */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <label className="admin-label">DOI String (Unique)</label>
              <input type="text" name="doi" className="admin-input" placeholder="e.g. 10.1234/wisdom-2026-v1-i1" />
            </div>

            <div>
              <label className="admin-label">Manual Citation (Optional)</label>
              <input type="text" name="citation" className="admin-input" placeholder="Optional pre-formatted citation" />
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--admin-border)', margin: '1rem 0' }} />

          {/* PDF UPLOAD */}
          <div>
            <label className="admin-label">Upload Manuscript PDF</label>
            <div className="admin-file-wrapper">
               <input type="file" name="pdf_file" accept=".pdf" className="admin-file-input" />
               <div className="admin-file-label">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  <span>Click to select PDF or drag and drop</span>
                  <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>File will be auto-indexed to scholarly repository</span>
               </div>
            </div>
          </div>

          {/* ABSTRACT */}
          <div>
            <label className="admin-label">Abstract</label>
            <textarea name="abstract" className="admin-input" style={{ minHeight: '150px', resize: 'vertical' }} placeholder="Enter manuscript abstract..."></textarea>
          </div>

          {/* FULL BODY EDITOR */}
          <div>
             <label className="admin-label">Full Manuscript Body / Preview</label>
             <div style={{ marginTop: '0.75rem' }}>
                <RichTextEditor name="body" />
             </div>
          </div>

          {/* SUBMIT */}
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--admin-border)', paddingTop: '2.5rem' }}>
             <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: '1rem 4rem', fontSize: '1.1rem' }}>
               Create Full Record
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
