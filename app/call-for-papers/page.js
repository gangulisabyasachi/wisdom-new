import Link from 'next/link';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';

export const metadata = {
  title: 'Call for Papers - WISDOM Journal',
  description: 'Submit to WISDOM Journal: Double-blinded peer review, 6–10 weeks decision, CC BY 4.0, APC ₹599 only after acceptance. Research articles, case notes, book reviews, and multidisciplinary submissions.',
  keywords: 'WISDOM journal submission guidelines, author guidelines, submit paper WISDOM, call for papers, multidisciplinary journal India, OSCOLA format, APC ₹599',
  alternates: {
    canonical: 'https://www.wisdomj.in/call-for-papers',
  },
  openGraph: {
    title: 'Call for Papers – WISDOM Journal',
    description: 'WISDOM Journal invites original, unpublished research papers for its multidisciplinary double-blinded peer-reviewed publication. APC payable only after acceptance.',
    url: 'https://www.wisdomj.in/call-for-papers',
    siteName: 'WISDOM Journal',
    images: [
      {
        url: '/images/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Call for Papers – WISDOM Journal | Multidisciplinary Peer-Reviewed Publication',
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

export default function CallForPapersPage() {
  const steps = [
    { title: "Preparation", desc: "Format your manuscript according to our scholarly guidelines (Word .doc/.docx)." },
    { title: "Review Cycle", desc: "6-10 week double-blinded peer evaluation for scientific merit." },
    { title: "Revisions", desc: "Address reviewer feedback and ensure zero plagiarism (<10%)." },
    { title: "Publication", desc: "Acceptance followed by APC payment and global digital release." }
  ];

  return (
    <main>
      {/* HEADER */}
      <PageHero>
        <div className="container">
          <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Open Submission Portal</div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Call for Scholarly Papers</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', lineHeight: '1.8' }}>
            WISDOM invites original, high-quality, and unpublished research contributions from global researchers.
            We accept multidisciplinary works across humanities, law, management, and technology.
          </p>
          <div style={{ marginTop: '2.5rem' }}>
            <a href="https://forms.gle/DV7cuWLcCkaj7CTF7" target="_blank" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M5 4v2h14V4H5zm10 7h-3V7h-2v4H7l5 5 5-5zM5 18v2h14v-2H5z" /></svg>
              Submit to Online Portal
            </a>
          </div>
        </div>
      </PageHero>

      {/* ROADMAP SECTION */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <ScrollReveal direction="up" delay={0.1}>
            <h2 style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '2rem' }}>Publication Roadmap</h2>
          </ScrollReveal>
          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            {steps.map((step, idx) => (
              <ScrollReveal key={idx} direction="up" delay={0.1 * (idx + 1)}>
                <div className="beauty-card" style={{ margin: 0, padding: '2.5rem', textAlign: 'center', borderTop: '4px solid var(--accent)' }}>
                  <div style={{ width: '40px', height: '40px', background: 'var(--accent)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontWeight: 800 }}>{idx + 1}</div>
                  <h3 style={{ marginBottom: '1rem' }}>{step.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDELINES GRID */}
      <section style={{ background: 'var(--bg-subtle)', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) 1fr', gap: '4rem' }}>

            <div className="main-guidelines">
              <ScrollReveal direction="left" delay={0.1}>
                <div className="beauty-card" style={{ padding: '3.5rem', marginBottom: '3rem' }}>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '2.5rem', color: 'var(--accent)' }}>1. Manuscript Formatting</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                      <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '1rem' }}>Typographic Standards</h4>
                      <ul className="guideline-list" style={{ fontSize: '0.95rem' }}>
                        <li>Font: **Times New Roman**</li>
                        <li>Title: 13pt (Bold, Centered)</li>
                        <li>Body: 11pt (Justified)</li>
                        <li>Author Details: 12pt (Italic)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '1rem' }}>Document Layout</h4>
                      <ul className="guideline-list" style={{ fontSize: '0.95rem' }}>
                        <li>Format: **Microsoft Word (.docx)**</li>
                        <li>Spacing: 1.15 Line Spacing</li>
                        <li>Margins: 1 inch (all sides)</li>
                        <li>References: **OSCOLA Format**</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.2}>
                <div className="beauty-card" style={{ padding: '3.5rem' }}>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '2.5rem', color: 'var(--accent)' }}>2. Submission Categories</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                      <strong>Research Articles / Long Papers</strong>
                      <span style={{ color: 'var(--text-muted)' }}>2,500 - 3,000 words</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                      <strong>Short Articles / Essays</strong>
                      <span style={{ color: 'var(--text-muted)' }}>1,500 - 2,000 words</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                      <strong>Case Notes & Commentaries</strong>
                      <span style={{ color: 'var(--text-muted)' }}>1,500 - 2,000 words</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <aside className="article-sidebar">
              <ScrollReveal direction="right" delay={0.3}>
                <div className="beauty-card" style={{ background: 'var(--bg-card)', padding: '2.5rem', borderLeft: '4px solid #10b981' }}>
                  <h3 style={{ fontSize: '1rem', color: '#047857', marginBottom: '1.5rem' }}>Submission Prerequisites</h3>
                  <ul className="guideline-list" style={{ fontSize: '0.85rem' }}>
                    <li>Abstract (150-200 words)</li>
                    <li>5-7 Scholarly Keywords</li>
                    <li>OSCOLA Reference list</li>
                    <li>Conflict of Interest declaration</li>
                    <li>Plagiarism report (&lt; 10%)</li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.4}>
                <div className="community-card" style={{ marginTop: '2rem', padding: '2.5rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Final Checks</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Ensure your cover page includes name, designation, institutional affiliation, and contact credentials before final upload.</p>
                </div>
              </ScrollReveal>
            </aside>
          </div>
        </div>
      </section>

      {/* APC TABLE SECTION */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container">
          <ScrollReveal direction="up" delay={0.1}>
            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Article Processing Charges (APC)</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '4rem' }}>Transparent fee structure for quality dissemination and peer-review maintenance. No fee is required during submission.</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <ScrollReveal direction="left" delay={0.2}>
                  <div className="beauty-card" style={{ padding: '3rem', borderTop: '8px solid var(--accent)' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1.5rem' }}>Indian Citizen</div>
                    <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>₹599 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ Paper</span></div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Payable only after manuscript acceptance and before digital publication.</p>
                  </div>
                </ScrollReveal>
                <ScrollReveal direction="right" delay={0.2}>
                  <div className="beauty-card" style={{ padding: '3rem', borderTop: '8px solid #1e40af' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1.5rem' }}>Foreign Citizen</div>
                    <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>$10 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ Paper</span></div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Standardized fee for international authors via secure payment portal.</p>
                  </div>
                </ScrollReveal>
              </div>

              <ScrollReveal direction="up" delay={0.4}>
                <div className="beauty-card" style={{ marginTop: '4rem', padding: '3rem', background: 'linear-gradient(135deg, var(--bg-subtle), var(--bg-card))', border: '1px solid var(--accent)', boxShadow: '0 10px 30px -10px var(--accent-light)', textAlign: 'left' }}>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ background: 'var(--accent)', color: 'white', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" /></svg>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Hardcopy Publication (Optional)</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                        Authors desiring a physical printed copy of the journal issue may opt for our high-quality printing service.
                      </p>
                    </div>
                  </div>
                  <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '1px', marginBottom: '0.5rem' }}>Domestic Authors</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>₹999 <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400 }}>+ APC Charges</span></div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '1px', marginBottom: '0.5rem' }}>International Authors</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>$10 <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400 }}>+ APC Charges</span></div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <ScrollReveal direction="up" delay={0.2}>
        <section style={{ background: '#0f172a', color: 'white', padding: '6rem 0' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Initiate Your Submission</h2>
            <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto 3rem' }}>
              Ready to contribute to the global scholarly community? Join 80+ authors who have published their results with WISDOM.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
              <a href="https://forms.gle/DV7cuWLcCkaj7CTF7" target="_blank" className="btn btn-primary" style={{ padding: '1.25rem 3rem' }}>Submit Your Manuscript</a>
              <Link href="/about" className="btn" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '1.25rem 3rem' }}>Read Ethics Policy</Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
