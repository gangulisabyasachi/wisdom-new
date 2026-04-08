import Link from 'next/link';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';

export const metadata = {
  title: 'Editorial Board - WISDOM Journal',
  description: 'Meet the distinguished Editorial Board of WISDOM Journal — led by Prof (Dr.) Subhrangsu Shekhar Chatterji. Includes top academics from ISI Kolkata, IIT ISM Dhanbad, MUN Canada, and more.',
  keywords: 'WISDOM journal editorial board, editor-in-chief, Prof Subhrangsu Shekhar Chatterji, ISI Kolkata, Calcutta University, double-blinded peer review board, multidisciplinary journal editors',
  alternates: {
    canonical: 'https://www.wisdomj.in/editorial-board',
  },
  openGraph: {
    title: 'Editorial Board – WISDOM Journal',
    description: 'Meet the distinguished Editorial Board of WISDOM Journal, led by Prof (Dr.) Subhrangsu Shekhar Chatterji. Scholars from ISI Kolkata, IIT ISM Dhanbad, MUN Canada, and leading institutions.',
    url: 'https://www.wisdomj.in/editorial-board',
    siteName: 'WISDOM Journal',
    images: [
      {
        url: '/images/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'WISDOM Journal - Editorial Board',
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

export default function EditorialBoardPage() {
  const boardMembers = [
    {
      name: "Prof (Dr.) Sanat Kumar Mandal",
      image: "/images/sanat-mandal.jpg",
      credentials: "M.Sc. BHU, Ph.D. SC (IACS)",
      role: "Board Member",
      affiliation: "Visiting Scientist (MUN, Canada), Adj. Professor (Bio-medical Sciences, Faculty of Medicine, MUN)",
      email: "sanat.mandal@cna.nl.ca",
      profile: "https://www.cna.nl.ca/research-and-innovation/profiles/sanat-mandal"
    },
    {
      name: "Prof. Dr. Probal Chowdhury",
      image: "/images/probal-chowdhury.jpeg",
      credentials: "Ph.D. University of California, Berkeley",
      role: "Board Member",
      affiliation: "Professor (HAG), Indian Statistical Institute, Kolkata",
      email: "probal@isical.ac.in",
      profile: "https://www.isical.ac.in/~probal/"
    },
    {
      name: "Prof. (Dr.) Debasis Sengupta",
      image: "/images/debashis-sengupta.jpeg",
      credentials: "PhD ISI Kolkata",
      role: "Board Member",
      affiliation: "Professor (HAG), Indian Statistical Institute, Kolkata",
      email: "sdebasis@isical.ac.in",
      profile: "https://www2.isical.ac.in/~asu/faculty.html"
    },
    {
      name: "Dr. Sraboni Gupta, PhD, LL.M.",
      image: "/images/sraboni-gupta.jpeg",
      credentials: "Associate Professor",
      role: "Board Member",
      affiliation: "Heritage Law College, affiliated to the University of Calcutta",
      location: "Kolkata, India"
    },
    {
      name: "Dr. Saptarsi Goswami",
      image: "/images/saptarshi-goswami.jpeg",
      role: "Board Member",
      credentials: "Assistant Professor & HoD - Computer Science",
      affiliation: "Bangabasi Morning College, Affiliated to the University of Calcutta",
      email: "sgakc@caluniv.ac.in",
      profile: "https://bit.ly/4qsXS4c"
    },
    {
      name: "Sri Joydip Ghoshal",
      image: "/images/joydip-ghosal.jpeg",
      credentials: "LLM, MA",
      role: "Board Member",
      affiliation: "Assistant Professor, Heritage Law College, affiliated to the University of Calcutta",
      location: "Kolkata, India"
    },
    {
      name: "Dr. Siddhartha Agarwal",
      image: "/images/siddharta-agarwal.jpeg",
      credentials: "PhD, Engineering Management (Missouri S&T, USA)",
      role: "Board Member",
      affiliation: "Assistant Professor, IIT ISM, Dhanbad",
      email: "sagarwal@iitism.ac.in",
      profile: "https://www.iitism.ac.in/faculty-details?faculty=sagarwal"
    },
    {
      name: "Dr. Dev Narayan Sarkar",
      image: "/images/dev-narayan-sarkar.jpeg",
      credentials: "PhD in Business Management (CU)",
      role: "Board Member",
      affiliation: "Senior VP, Godrej Interio, Godrej & Boyce",
      location: "Mumbai, India"
    }
  ];

  const managingEditor = {
    name: "Prithwish Ganguli, Advocate",
    image: "/images/prithwish-ganguli.jpg",
    role: "Managing Editor",
    credentials: "LLM (CU), MA in Criminology & Forensic Sc (NALSAR), MA in Sociology (SRU), MA in Psychology (SGVU), Dip in Cyber Law (ASCL)",
    affiliation: "Legal Advocate & Scholar"
  };
 
  const editorialSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WISDOM Journal Editorial Board",
    "editor": [
      {
        "@type": "Person",
        "name": "Prof (Dr.) Subhrangsu Shekhar Chatterji",
        "jobTitle": "Editor-in-Chief",
        "affiliation": "University of Calcutta",
        "sameAs": [
          "https://www.caluniv.ac.in/academic/Law.php"
        ]
      },
      ...boardMembers.map(m => ({
        "@type": "Person",
        "name": m.name,
        "jobTitle": m.role,
        "affiliation": m.affiliation,
        "url": m.profile || undefined
      }))
    ]
  };

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', position: 'relative' }}>
        {/* STRUCTURED DATA FOR SEARCH ENGINES */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(editorialSchema) }}
        />
        {/* ✨ MODERN HERO SECTION */}
        <PageHero>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '5px', marginBottom: '2rem' }}>
                        Editorial Stewardship
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem, 10vw, 6rem)', marginBottom: '1.5rem', lineHeight: 1.05, fontWeight: 500 }}>
                        Scholarly <span className="signature-accent" style={{ fontStyle: 'italic' }}>Leadership</span>
                    </h1>
                    <div style={{ height: '2px', width: '100px', background: 'var(--accent)', margin: '2.5rem auto' }}></div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.4rem', color: 'var(--text-secondary)', maxWidth: '850px', margin: '0 auto', lineHeight: 1.7, fontStyle: 'italic' }}>
                        A distinguished assembly of global scholars overseeing rigorous multidisciplinary review and scientific integrity.
                    </p>
                </div>
            </div>
        </PageHero>

        {/* 👑 TIER 1: EDITOR-IN-CHIEF (THE CROWN) */}
        <section style={{ padding: '10rem 0', position: 'relative', zIndex: 2, marginTop: '-5rem' }}>
            <div className="container">
                <ScrollReveal direction="up" delay={0.2}>
                    <div className="profile-card-premium profile-card-responsive" style={{ padding: '0' }}>
                        <div className="leader-portrait-wrap responsive-portrait">
                            <img src="/images/s-s-chatterjee.jpeg" alt="Prof (Dr.) Subhrangsu Shekhar Chatterji" />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', background: 'linear-gradient(to top, rgba(147, 10, 23, 0.9), transparent)', color: 'white', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                Editor-in-Chief
                            </div>
                        </div>
                        <div className="responsive-content" style={{ textAlign: 'left' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <span style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '3px' }}>Dean's Vision</span>
                                <div style={{ height: '1px', flex: 1, background: 'var(--border)' }}></div>
                            </div>
                            <h2 className="responsive-title" style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', marginBottom: '1.5rem', color: 'var(--text-primary)', fontWeight: 500 }}>Prof (Dr.) <span className="signature-accent" style={{ fontStyle: 'italic' }}>Subhrangsu Shekhar</span> Chatterji</h2>
                            <div className="responsive-credentials" style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                                <span style={{ padding: '6px 16px', border: '1px solid var(--accent)', color: 'var(--accent)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>PhD (BHU)</span>
                                <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>Distinguished Scholar & Jurist</span>
                            </div>
                            
                            <div className="responsive-stat-list" style={{ display: 'grid', gap: '1.5rem' }}>
                                {[
                                    { label: "Ex Dean Head & Secretary", val: "Department of Law, University of Calcutta" },
                                    { label: "Ex Vice Chancellor", val: "Panchanan Barma University" },
                                    { label: "Ex Chairman", val: "West Bengal Public Service Commission (WBPSC)" }
                                ].map((item, i) => (
                                    <div key={i} className="responsive-stat-item" style={{ display: 'flex', gap: '20px' }}>
                                        <div style={{ width: '12px', height: '12px', background: 'var(--accent)', borderRadius: '50%', marginTop: '6px', flexShrink: 0 }}></div>
                                        <div>
                                            <div style={{ fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '2px' }}>{item.label}</div>
                                            <div style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{item.val}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>

        {/* 📋 TIER 2: MANAGING EDITOR */}
        <section style={{ padding: '6rem 0', background: 'var(--bg-subtle)' }}>
            <div className="container">
                <ScrollReveal direction="up" delay={0.1}>
                  <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Operational Excellence</div>
                      <h2 style={{ fontSize: '2.5rem' }}>Core Coordination</h2>
                  </div>
                </ScrollReveal>
                
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <ScrollReveal direction="up" delay={0.2}>
                      <div className="profile-card-premium profile-card-responsive managing-editor-card" style={{ padding: '0', background: 'var(--bg-card)' }}>
                          <div className="responsive-portrait" style={{ width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '8px solid var(--bg-subtle)', boxShadow: 'var(--shadow-md)' }}>
                              <img src={managingEditor.image} alt={managingEditor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div>
                              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Managing Editor</div>
                              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{managingEditor.name}</h3>
                              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>{managingEditor.credentials}</p>
                              <div style={{ padding: '1rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', borderLeft: '3px solid var(--accent)' }}>
                                  {managingEditor.affiliation}
                              </div>
                          </div>
                      </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>

        {/* 🎓 TIER 3: DISTINGUISHED MEMBERS */}
        <section style={{ padding: '10rem 0' }}>
            <div className="container">
                <ScrollReveal direction="up" delay={0.1}>
                  <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>The Board</div>
                      <h2 style={{ fontSize: '3rem' }}>Distinguished <span className="signature-accent">Members</span></h2>
                      <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Global experts from leading research institutions and universities.</p>
                  </div>
                </ScrollReveal>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '3rem' }}>
                    {boardMembers.map((member, idx) => (
                        <ScrollReveal key={idx} direction={idx % 2 === 0 ? "left" : "right"} delay={0.1 * (idx % 3)}>
                            <div className="profile-card-premium">
                                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                                    <div style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
                                        <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>{member.role}</div>
                                        <h3 style={{ fontSize: '1.25rem', marginTop: '4px', lineHeight: 1.3 }}>{member.name}</h3>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>{member.credentials}</div>
                                    </div>
                                </div>
                                
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>
                                    {member.affiliation}
                                </p>
                                
                                <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {member.profile ? (
                                        <a href={member.profile} target="_blank" style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            SCHOLARLY PROFILE 
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                                        </a>
                                    ) : (
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                            {member.location}
                                        </div>
                                    )}
                                    {member.email && (
                                        <a href={`mailto:${member.email}`} title={member.email} style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>

        {/* 🛡️ RESPONSIBILITIES: THE PROMISE */}
        <section style={{ padding: '0 0 10rem' }}>
            <div className="container">
               <ScrollReveal direction="up" delay={0.2}>
                 <div style={{ background: 'var(--bg-card)', padding: '5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'radial-gradient(circle at top right, var(--accent-light), transparent)', opacity: 0.5 }}></div>
                    
                    <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
                      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                          <h2 style={{ fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--accent)' }}>Editorial Stewardship</h2>
                          <div style={{ height: '2px', width: '40px', background: 'var(--accent)', margin: '1.5rem auto' }}></div>
                      </div>

                      <div style={{ display: 'grid', gap: '2rem' }}>
                          {[
                              "Ensuring original, double-blinded peer-reviewed content under strict academic independence.",
                              "Reviewing journal aims, scope, and editorial policies for disciplinary coherence.",
                              "Overseeing a transparent, fair, and timely review process for all manuscripts.",
                              "Upholding COPE guidelines and managing scientific integrity effectively.",
                              "Maintaining metadata accuracy and indexing compliance for global discoverability."
                          ].map((item, i) => (
                              <div key={i} style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                                  <div style={{ width: '40px', height: '40px', background: 'var(--bg-subtle)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--border)' }}>
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                  </div>
                                  <span style={{ fontSize: '1.15rem', color: 'var(--text-primary)', fontWeight: 500 }}>{item}</span>
                              </div>
                          ))}
                      </div>
                    </div>
                 </div>
               </ScrollReveal>
            </div>
        </section>
    </main>
  );
}
