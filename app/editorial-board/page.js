import Link from 'next/link';

export const metadata = {
  title: 'Editorial Board - WISDOM Journal',
  description: 'Meet the distinguished Editorial Board of WISDOM Journal — led by Prof (Dr.) Subhrangsu Shekhar Chatterji. Includes top academics from global institutions.',
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

  return (
    <main className="reveal">
        {/* HEADER SECTION */}
        <section style={{ background: 'var(--bg-subtle)', padding: 'calc(var(--nav-height) + 4rem) 0 6rem', borderBottom: '1px solid var(--border)' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Editorial Excellence</div>
                <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>Leadership & Board</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
                    A distinguished assembly of global scholars overseeing rigorous multidisciplinary review and scientific integrity.
                </p>
            </div>
        </section>

        {/* EDITOR-IN-CHIEF SECTION */}
        <section style={{ padding: '6rem 0' }}>
            <div className="container">
                <div className="leader-card reveal" style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '4rem', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', alignItems: 'center', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)' }}>
                    <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }}>
                        <img src="/images/s-s-chatterjee.jpeg" alt="Prof (Dr.) Subhrangsu Shekhar Chatterji" style={{ width: '100%', display: 'block' }} />
                    </div>
                    <div className="leader-info">
                        <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>Leadership</span>
                        <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>Prof (Dr.) Subhrangsu Shekhar Chatterji</h2>
                        <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Editor-in-Chief | PhD (BHU)</div>
                        <div style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-primary)' }}>
                           <p style={{ marginBottom: '1rem' }}><strong>Ex Dean Head and Secretary,</strong> Department of Law, University of Calcutta</p>
                           <p style={{ marginBottom: '1rem' }}><strong>Ex Vice Chancellor,</strong> Panchanan Barma University</p>
                           <p><strong>Ex Chairman,</strong> West Bengal Public Service Commission (WBPSC)</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* MANAGING EDITOR SECTION */}
        <section style={{ background: 'var(--bg-subtle)', padding: '6rem 0' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '4rem' }}>Managing Editor</h2>
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <div className="beauty-card" style={{ padding: '3rem' }}>
                        <img src={managingEditor.image} alt={managingEditor.name} style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1.5rem', border: '5px solid var(--border)' }} />
                        <h3 style={{ fontSize: '1.25rem' }}>{managingEditor.name}</h3>
                        <p style={{ color: 'var(--accent)', fontWeight: 700, margin: '1rem 0' }}>{managingEditor.role}</p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{managingEditor.credentials}</p>
                    </div>
                </div>
            </div>
        </section>

        {/* BOARD MEMBERS GRID */}
        <section style={{ padding: '8rem 0' }}>
            <div className="container">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '5rem', textAlign: 'center' }}>Distinguished Members</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
                    {boardMembers.map((member, idx) => (
                        <div key={idx} className="beauty-card" style={{ margin: 0, padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem' }}>
                                <img src={member.image} alt={member.name} style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                                <div>
                                   <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase' }}>{member.role}</div>
                                   <h3 style={{ fontSize: '1.1rem', marginTop: '5px' }}>{member.name}</h3>
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontStyle: 'italic', marginBottom: '1rem' }}>{member.credentials}</p>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{member.affiliation}</p>
                            </div>
                            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                               {member.profile ? (
                                  <a href={member.profile} target="_blank" style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                     Scholarly Profile <span>&rarr;</span>
                                  </a>
                               ) : (
                                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{member.location}</span>
                               )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* RESPONSIBILITIES SECTION */}
        <section style={{ background: 'var(--bg-subtle)', padding: '6rem 0 10rem' }}>
            <div className="container">
               <div style={{ maxWidth: '850px', margin: '0 auto', background: 'var(--bg-card)', padding: '4rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '3rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)', textAlign: 'center' }}>Editorial Stewardship</h2>
                  <div className="article-body" style={{ fontSize: '1.05rem' }}>
                      <ul className="guideline-list" style={{ listStyle: 'none' }}>
                         {[
                            "Ensuring original, double-blinded peer-reviewed content under strict academic independence.",
                            "Reviewing journal aims, scope, and editorial policies for disciplinary coherence.",
                            "Overseeing a transparent, fair, and timely review process for all manuscripts.",
                            "Upholding COPE guidelines and managing scientific integrity effectively.",
                            "Maintaining metadata accuracy and indexing compliance for global discoverability."
                         ].map((item, i) => (
                            <li key={i} style={{ display: 'flex', gap: '20px', marginBottom: '1.5rem', alignItems: 'baseline' }}>
                               <svg width="20" height="20" fill="var(--accent)" viewBox="0 0 24 24" style={{ flexShrink: 0 }}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                               <span>{item}</span>
                            </li>
                         ))}
                      </ul>
                  </div>
               </div>
            </div>
        </section>
    </main>
  );
}
