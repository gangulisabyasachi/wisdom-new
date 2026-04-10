'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import RichTextEditor from '@/app/components/RichTextEditor';
import { updateJournalAction } from '../../actions';

export default function EditJournalPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  
  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    topic: '',
    slug: '',
    authors: '',
    affiliations: '',
    volume: '',
    issue: '',
    page: '',
    published_date: '',
    keywords: '',
    doi: '',
    citation: '',
    abstract: '',
    body: '',
    pdf_path: ''
  });

  useEffect(() => {
    async function fetchJournal() {
      try {
        const res = await fetch(`/api/journals/${id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setJournal(data);
        setFormData({
          topic: data.topic || '',
          slug: data.slug || '',
          authors: data.authors || '',
          affiliations: data.affiliations || '',
          volume: data.volume || '',
          issue: data.issue || '',
          page: data.page || '',
          published_date: data.published_date ? new Date(data.published_date).toISOString().split('T')[0] : '',
          keywords: data.keywords || '',
          doi: data.doi || '',
          citation: data.citation || '',
          abstract: data.abstract || '',
          body: data.body || '',
          pdf_path: data.pdf_path || ''
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchJournal();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const rawForm = e.target;
    const submissionData = new FormData(rawForm);

    try {
      const result = await updateJournalAction(id, submissionData);
      if (result.success) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } else {
        alert("Failed to save: " + result.error);
      }
    } catch (err) {
      console.error("Update Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="admin-loader">Loading Manuscript...</div>;
  if (!journal) return <div className="admin-error">Record NOT found.</div>;

  return (
    <div className="reveal" style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
      
      {/* 🌟 Success Notification */}
      {showToast && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', background: '#059669', color: 'white',
          padding: '1rem 2rem', borderRadius: '8px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          zIndex: 9999, display: 'flex', alignItems: 'center', gap: '12px',
          animation: 'slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
          <span style={{ fontWeight: 600 }}>Scholarly changes saved successfully!</span>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2.5rem', gap: '1.5rem' }}>
        <Link href="/admin/journals" className="admin-btn admin-btn-outline">← Back</Link>
        <h1 className="admin-page-title" style={{ margin: 0 }}>Edit Manuscript: {formData.topic.substring(0, 30)}...</h1>
      </div>

      <div className="admin-card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <label className="admin-label">Topic / Title (Required)</label>
              <input type="text" name="topic" value={formData.topic} onChange={handleInputChange} className="admin-input" required />
            </div>

            <div>
              <label className="admin-label">URL Slug (Required)</label>
              <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} className="admin-input" required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <label className="admin-label">Authors</label>
              <input type="text" name="authors" value={formData.authors} onChange={handleInputChange} className="admin-input" />
            </div>

            <div>
              <label className="admin-label">Affiliations</label>
              <input type="text" name="affiliations" value={formData.affiliations} onChange={handleInputChange} className="admin-input" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
            <div>
              <label className="admin-label">Volume</label>
              <input type="number" name="volume" value={formData.volume} onChange={handleInputChange} className="admin-input" />
            </div>

            <div>
              <label className="admin-label">Issue</label>
              <input type="number" name="issue" value={formData.issue} onChange={handleInputChange} className="admin-input" />
            </div>

            <div>
              <label className="admin-label">Pagination Range</label>
              <input type="text" name="page" value={formData.page} onChange={handleInputChange} className="admin-input" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
            <div>
              <label className="admin-label">Published Date</label>
              <input type="date" name="published_date" value={formData.published_date} onChange={handleInputChange} className="admin-input" />
            </div>

            <div>
              <label className="admin-label">Keywords (Comma separated)</label>
              <input type="text" name="keywords" value={formData.keywords} onChange={handleInputChange} className="admin-input" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <label className="admin-label">DOI String (Unique)</label>
              <input type="text" name="doi" value={formData.doi} onChange={handleInputChange} className="admin-input" />
            </div>

            <div>
              <label className="admin-label">Manual Citation (Optional)</label>
              <input type="text" name="citation" value={formData.citation} onChange={handleInputChange} className="admin-input" />
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
                  <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>Current: <code style={{ color: 'var(--admin-primary)' }}>{formData.pdf_path || 'None indexed'}</code></span>
               </div>
            </div>
            <input type="hidden" name="pdf_path" value={formData.pdf_path} />
          </div>

          <div>
            <label className="admin-label">Abstract</label>
            <textarea name="abstract" value={formData.abstract} onChange={handleInputChange} className="admin-input" style={{ minHeight: '150px', resize: 'vertical' }}></textarea>
          </div>

          <div>
             <label className="admin-label">Full Manuscript Body / Preview</label>
             <div style={{ marginTop: '0.75rem' }}>
                <RichTextEditor name="body" initialValue={formData.body} />
             </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--admin-border)', paddingTop: '2.5rem' }}>
             <button type="submit" disabled={isSubmitting} className="admin-btn admin-btn-primary" style={{ padding: '1rem 4rem', fontSize: '1.1rem' }}>
               {isSubmitting ? 'Saving...' : 'Save Scholarly Changes'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
