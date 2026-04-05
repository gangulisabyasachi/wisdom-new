import Link from 'next/link';

export const metadata = {
    title: 'About WISDOM | Multidisciplinary Double-Blinded Peer-Reviewed Journal',
    description: 'WISDOM is a double-blinded peer-reviewed multidisciplinary journal published by Jayasree Publications, promoting high-quality research.',
};

export default function AboutPage() {
    return (
        <main className="reveal">
            <section style={{ background: 'var(--bg-subtle)', padding: 'calc(var(--nav-height) + 4rem) 0 4rem', borderBottom: '1px solid var(--border)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Journal Profile</div>
                    <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', letterSpacing: '-2px' }}>About WISDOM</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', margin: '0 auto', maxWidth: '850px', lineHeight: '1.8' }}>
                        A premier digital platform for multidisciplinary research, dedicated to advancing global knowledge
                        through rigorous double-blinded peer review and evidence-based scholarship.
                    </p>
                </div>
            </section>

            <section style={{ padding: '6rem 0' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '4rem' }}>

                    <div className="about-content">
                        <div style={{ marginBottom: '4rem' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>The Scholarly Identity</h2>
                            <div className="article-body">
                                <p>
                                    WISDOM is a multidisciplinary, double-blinded peer-reviewed journal dedicated to the advancement of
                                    knowledge and academic excellence across diverse fields of study. Published by Jayasree Publications,
                                    the journal provides a vibrant platform for scholars and practitioners to share original research,
                                    critical analyses, and innovative ideas.
                                </p>
                                <p>
                                    Guided by an esteemed Editorial Board of eminent experts, we uphold the highest standards of integrity,
                                    objectivity, and quality. We welcome contributions from humanities, social sciences, law, management,
                                    and technology, bridging the gap between theoretical exploration and practical innovation.
                                </p>
                            </div>
                        </div>

                        <div className="highlights-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
                            <div className="highlight-card" style={{ padding: '2rem' }}>
                                <h3 style={{ fontSize: '1.25rem' }}>Global Vision</h3>
                                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Empowering global scholars with an inclusive platform for impactful research dissemination that transcends disciplinary boundaries.</p>
                            </div>
                            <div className="highlight-card" style={{ padding: '2rem' }}>
                                <h3 style={{ fontSize: '1.25rem' }}>Integrity First</h3>
                                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Our double-blinded review process ensures every paper published under the WISDOM banner meets strictly vetted academic standards.</p>
                            </div>
                        </div>

                        <div style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius-lg)', padding: '3.5rem', border: '1px solid var(--border)' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)' }}>Aims & Objectives</h2>
                            <ul className="guideline-list" style={{ listStyle: 'none' }}>
                                <li style={{ display: 'flex', gap: '15px', marginBottom: '1.5rem' }}>
                                    <span style={{ color: 'var(--accent)', fontWeight: 900 }}>&bull;</span>
                                    <span style={{ fontSize: '1.1rem' }}>Publishing high-impact original research across multiple scholarly disciplines.</span>
                                </li>
                                <li style={{ display: 'flex', gap: '15px', marginBottom: '1.5rem' }}>
                                    <span style={{ color: 'var(--accent)', fontWeight: 900 }}>&bull;</span>
                                    <span style={{ fontSize: '1.1rem' }}>Encouraging interdisciplinary collaboration to address modern global challenges.</span>
                                </li>
                                <li style={{ display: 'flex', gap: '15px', marginBottom: '1.5rem' }}>
                                    <span style={{ color: 'var(--accent)', fontWeight: 900 }}>&bull;</span>
                                    <span style={{ fontSize: '1.1rem' }}>Supporting emerging scholars by providing a world-class platform to showcase their work.</span>
                                </li>
                                <li style={{ display: 'flex', gap: '15px', marginBottom: '1.5rem' }}>
                                    <span style={{ color: 'var(--accent)', fontWeight: 900 }}>&bull;</span>
                                    <span style={{ fontSize: '1.1rem' }}>Ensuring evidence-based research remains accessible for the development of a knowledge-based society.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <aside className="about-sidebar">
                        <div style={{ position: 'sticky', top: 'calc(var(--nav-height) + 2rem)' }}>
                            <div className="beauty-card" style={{ margin: 0, padding: '2rem' }}>
                                <h4 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Journal Quick Facts</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Started</span>
                                        <span style={{ fontWeight: 700 }}>2025</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Frequency</span>
                                        <span style={{ fontWeight: 700 }}>Quarterly</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ISSN (P)</span>
                                        <span style={{ fontWeight: 700 }}>3108-0499</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ISSN (E)</span>
                                        <span style={{ fontWeight: 700 }}>3108-351X</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Language</span>
                                        <span style={{ fontWeight: 700 }}>English</span>
                                    </div>
                                    <div style={{ paddingTop: '1rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Publisher</span>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Jayasree Publications, India</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                                <Link href="/contact" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>Inquire with Editor</Link>
                            </div>
                        </div>
                    </aside>

                </div>
            </section>
        </main>
    );
}
