import { connectDB } from '../../../../lib/db';
import Journal from '../../../../lib/models/Journal';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import RichTextEditor from '@/app/components/RichTextEditor';
import AdminFileUpload from '@/app/components/AdminFileUpload';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export default async function AddJournalPage() {

  async function createJournal(formData) {
    'use server';
    console.log("[Upload Trace] 🚀 createJournal Action Started");
    
    try {
      await connectDB();
      console.log("[Upload Trace] ✅ DB Connected");

      const topic = formData.get('topic');
      const slug = formData.get('slug');
      const pdfFile = formData.get('pdf_file');
      
      console.log(`[Upload Trace] 📄 Metadata: Topic=${topic}, Slug=${slug}`);

      let pdfPath = '';

      // 📂 Robust PDF File Upload
      if (pdfFile && pdfFile.size > 0) {
        console.log(`[Upload Trace] 📥 PDF Detected: Name=${pdfFile.name}, Size=${pdfFile.size} bytes`);
        
        try {
          const bytes = await pdfFile.arrayBuffer();
          const buffer = Buffer.from(bytes);
          
          // Use absolute pathing for main website/public/uploads
          const uploadDir = join(process.cwd(), 'public', 'uploads');
          console.log(`[Upload Trace] 📂 Target Directory: ${uploadDir}`);
          
          await mkdir(uploadDir, { recursive: true });
          console.log("[Upload Trace] ✅ Directory Verified/Created");

          const fileName = `${slug || 'manuscript'}-${Date.now()}.pdf`;
          const filePath = join(uploadDir, fileName);
          console.log(`[Upload Trace] 💾 Writing File: ${filePath}`);
          
          await writeFile(filePath, buffer);
          console.log("[Upload Trace] ✅ File Written Success");
          
          pdfPath = `/uploads/${fileName}`;
        } catch (err) {
          console.error("[Upload Trace] ❌ PDF Persistence Failed:", err);
          // If file fails, we'll continue but pdfPath will be empty.
        }
      } else {
        console.log("[Upload Trace] ⚠️ No PDF file detected or file is empty.");
      }

      const newJournalData = {
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
        status: 'published'
      };

      console.log("[Upload Trace] 💾 Saving to MongoDB...");
      const created = await Journal.create(newJournalData);
      console.log(`[Upload Trace] ✅ Record Created: ID=${created._id}`);

    } catch (error) {
      console.error("[Upload Trace] ❌ Global Action Error:", error);
    }
    
    console.log("[Upload Trace] 🏎️ Redirecting to Journals List");
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <label className="admin-label">DOI String (Unique)</label>
              <input type="text" name="doi" className="admin-input" placeholder="e.g. 10.1234/..." />
            </div>

            <div>
              <label className="admin-label">Manual Citation (Optional)</label>
              <input type="text" name="citation" className="admin-input" placeholder="Optional pre-formatted citation" />
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--admin-border)', margin: '1rem 0' }} />

          <div>
            <label className="admin-label">Upload Manuscript PDF (Required for link)</label>
            <AdminFileUpload name="pdf_file" required={true} />
          </div>

          <div>
            <label className="admin-label">Abstract</label>
            <textarea name="abstract" className="admin-input" style={{ minHeight: '150px', resize: 'vertical' }} placeholder="Enter manuscript abstract..."></textarea>
          </div>

          <div>
             <label className="admin-label">Full Manuscript Body / Preview</label>
             <div style={{ marginTop: '0.75rem' }}>
                <RichTextEditor name="body" />
             </div>
          </div>

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
