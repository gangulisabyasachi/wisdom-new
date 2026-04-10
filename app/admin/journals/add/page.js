'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import RichTextEditor from '@/app/components/RichTextEditor';
import AdminFileUpload from '@/app/components/AdminFileUpload';
import { createJournal } from '../actions';

export default function AddJournalPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 📝 Form State
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
    body: ''
  });

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')     // Replace spaces with -
      .replace(/[^\w-]+/g, '')  // Remove all non-word chars
      .replace(/--+/g, '-')     // Replace multiple - with single -
      .replace(/^-+/, '')       // Trim - from start of text
      .replace(/-+$/, '');      // Trim - from end of text
  };

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const newState = { ...prev, [name]: value };
      
      // Auto-generate hyphenated slug if the topic is being edited
      if (name === 'topic') {
        newState.slug = slugify(value);
      }
      
      return newState;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const rawForm = e.target;
    const submissionData = new FormData(rawForm);

    try {
      const result = await createJournal(submissionData);
      if (result.success) {
        setToastMsg("Manuscript created successfully! Redirecting to editor...");
        setShowToast(true);
        // Stay in context: Move to the edit page of the new record instead of the list
        setTimeout(() => {
          router.push(`/admin/journals/edit/${result.id}`);
        }, 1500);
      } else {
        alert("Failed to create manuscript: " + result.error);
      }
    } catch (err) {
      console.error("Submission Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reveal" style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
      
      {/* 🌟 Professional Admin Success Toast */}
      {showToast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#059669',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '8px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          animation: 'slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
          <span style={{ fontWeight: 600 }}>{toastMsg}</span>
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2.5rem', gap: '1.5rem' }}>
        <Link href="/admin/journals" className="admin-btn admin-btn-outline">← Back</Link>
        <h1 className="admin-page-title" style={{ margin: 0 }}>Add New Manuscript</h1>
      </div>

      <div className="admin-card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <label className="admin-label">Topic / Title (Required)</label>
              <input 
                type="text" 
                name="topic" 
                className="admin-input" 
                required 
                value={formData.topic}
                onChange={handleInputChange}
                placeholder="Enter scholarly title..." 
              />
            </div>

            <div>
              <label className="admin-label">URL Slug (Required)</label>
              <input 
                type="text" 
                name="slug" 
                className="admin-input" 
                required 
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="e.g. impact-of-ai-2026" 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <label className="admin-label">Authors</label>
              <input 
                type="text" 
                name="authors" 
                className="admin-input" 
                value={formData.authors}
                onChange={handleInputChange}
                placeholder="John Doe, Jane Smith" 
              />
            </div>

            <div>
              <label className="admin-label">Affiliations</label>
              <input 
                type="text" 
                name="affiliations" 
                className="admin-input" 
                value={formData.affiliations}
                onChange={handleInputChange}
                placeholder="University Name, Country" 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
            <div>
              <label className="admin-label">Volume</label>
              <input 
                type="number" 
                name="volume" 
                className="admin-input" 
                value={formData.volume}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="admin-label">Issue</label>
              <input 
                type="number" 
                name="issue" 
                className="admin-input" 
                value={formData.issue}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="admin-label">Pagination Range</label>
              <input 
                type="text" 
                name="page" 
                className="admin-input" 
                value={formData.page}
                onChange={handleInputChange}
                placeholder="e.g. 15-27" 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
            <div>
              <label className="admin-label">Published Date</label>
              <input 
                type="date" 
                name="published_date" 
                className="admin-input" 
                value={formData.published_date}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="admin-label">Keywords (Comma separated)</label>
              <input 
                type="text" 
                name="keywords" 
                className="admin-input" 
                value={formData.keywords}
                onChange={handleInputChange}
                placeholder="AI, Ethics, Law..." 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <label className="admin-label">DOI String (Unique)</label>
              <input 
                type="text" 
                name="doi" 
                className="admin-input" 
                value={formData.doi}
                onChange={handleInputChange}
                placeholder="e.g. 10.1234/..." 
              />
            </div>

            <div>
              <label className="admin-label">Manual Citation (Optional)</label>
              <input 
                type="text" 
                name="citation" 
                className="admin-input" 
                value={formData.citation}
                onChange={handleInputChange}
                placeholder="Optional pre-formatted citation" 
              />
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--admin-border)', margin: '1rem 0' }} />

          <div>
            <label className="admin-label">Upload Manuscript PDF (Required for link)</label>
            <AdminFileUpload name="pdf_file" required={true} />
          </div>

          <div>
            <label className="admin-label">Abstract</label>
            <textarea 
               name="abstract" 
               className="admin-input" 
               style={{ minHeight: '150px', resize: 'vertical' }} 
               value={formData.abstract}
               onChange={handleInputChange}
               placeholder="Enter manuscript abstract..."
            ></textarea>
          </div>

          <div>
             <label className="admin-label">Full Manuscript Body / Preview</label>
             <div style={{ marginTop: '0.75rem' }}>
                 <RichTextEditor 
                    name="body" 
                    initialValue={formData.body} 
                 />
             </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--admin-border)', paddingTop: '2.5rem' }}>
             <button 
                type="submit" 
                disabled={isSubmitting}
                className="admin-btn admin-btn-primary" 
                style={{ padding: '1rem 4rem', fontSize: '1.1rem' }}
             >
               {isSubmitting ? 'Creating Record...' : 'Publish Full Manuscript'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
