import PageHero from '../components/PageHero';

export const metadata = {
  title: 'Contact Us - WISDOM Journal',
  description: 'Contact the editorial team of WISDOM Journal for manuscript submissions, inquiries, double-blinded peer review support, and general assistance. Email: editorial@wisdomj.in | Phone: +91-89100 10980',
  keywords: 'WISDOM journal contact, editorial office, manuscript submission, double-blinded peer review inquiry, journal support, editorial@wisdomj.in, Jayasree Publications',
  alternates: {
    canonical: 'https://www.wisdomj.in/contact',
  },
  openGraph: {
    title: 'Contact Us - WISDOM Journal',
    description: 'Contact the editorial team of WISDOM Journal for manuscript submissions, inquiries, and editorial support.',
    url: 'https://www.wisdomj.in/contact',
    siteName: 'WISDOM Journal',
    images: [
      {
        url: '/images/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Contact Us - WISDOM Journal',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <main className="reveal">
        {/* HEADER SECTION */}
        <PageHero>
            <div className="container" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Support Hub</div>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Connect with WISDOM</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                    Need help with your submission or have an editorial inquiry? Our team is available for global scholarly support.
                </p>
            </div>
        </PageHero>

        {/* CONTACT CONTENT */}
        <section style={{ padding: '6rem 0' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) 1fr', gap: '4rem' }}>
                
                {/* 📝 FUNCTIONAL CONTACT FORM via FormSubmit.co */}
                <div className="contact-form-section">
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '3rem' }}>Send a Message</h2>
                    <form 
                        action="https://formsubmit.co/wisdomjournal25@gmail.com" 
                        method="POST"
                        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}
                    >
                        {/* FormSubmit.co Config */}
                        <input type="hidden" name="_captcha" value="false" />
                        <input type="hidden" name="_template" value="table" />
                        <input type="hidden" name="_next" value="/contact" />
                        <input type="hidden" name="_subject" value="New Scholarly Inquiry - WISDOM Journal" />

                        <div style={{ gridColumn: 'span 1' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>Full Name</label>
                            <input 
                                name="name"
                                type="text" 
                                required 
                                className="form-input" 
                                placeholder="e.g. Dr. John Doe"
                                style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card)', color: 'inherit' }} 
                            />
                        </div>
                        <div style={{ gridColumn: 'span 1' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>Email Address</label>
                            <input 
                                name="email"
                                type="email" 
                                required 
                                className="form-input" 
                                placeholder="scholar@university.edu"
                                style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card)', color: 'inherit' }} 
                            />
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>Subject Inquiry</label>
                            <input 
                                name="subject"
                                type="text" 
                                required 
                                className="form-input" 
                                placeholder="e.g. Manuscript Submission Status"
                                style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card)', color: 'inherit' }} 
                            />
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>Detailed Message</label>
                            <textarea 
                                name="message"
                                required 
                                rows="6" 
                                className="form-input" 
                                placeholder="Please provide your manuscript ID if applicable..."
                                style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-card)', color: 'inherit', resize: 'vertical' }}
                            ></textarea>
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem' }}>
                                Send Inquiry To Editor
                            </button>
                        </div>
                    </form>
                </div>

                {/* 📍 CONTACT INFO HUB */}
                <aside className="contact-sidebar">
                   <div className="beauty-card" style={{ margin: 0, padding: '3rem', borderTop: '4px solid var(--accent)' }}>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '2.5rem' }}>Editorial Office</h3>
                      
                      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                         <div style={{ fontSize: '1.5rem' }}>✉️</div>
                         <div>
                            <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>Email</div>
                            <div style={{ fontWeight: 700, color: 'var(--accent)' }}>wisdomjournal25@gmail.com</div>
                            <div style={{ fontWeight: 700, color: 'var(--accent)' }}>editorial@wisdomj.in</div>
                         </div>
                      </div>

                      {/* <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                         <div style={{ fontSize: '1.5rem' }}>📞</div>
                         <div>
                            <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>Global Support</div>
                            <div style={{ fontWeight: 700 }}>+91-89100 10980</div>
                         </div>
                      </div> */}

                      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem' }}>
                         <div style={{ fontSize: '1.5rem' }}>📍</div>
                         <div>
                            <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>Address</div>
                            <div style={{ fontWeight: 700, lineHeight: '1.6' }}>
                                EE 73/5, Salt Lake, Kolkata 700091<br/>West Bengal, India
                            </div>
                         </div>
                      </div>

                      {/* <div style={{ paddingTop: '2.5rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                         <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>A publishing wing of Jayasree Publications.</div>
                         <div style={{ width: '100%', height: '150px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>[ Academic Map Interface ]</span>
                         </div>
                      </div> */}
                   </div>
                </aside>

            </div>
        </section>
    </main>
  );
}
