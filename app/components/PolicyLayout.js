import Link from 'next/link';
import PageHero from './PageHero';

export default function PolicyLayout({ title, subtitle, children }) {
  const policies = [
    { name: 'Peer Review Policy', href: '/peer-review-policy' },
    { name: 'COPE Ethics', href: '/cope-ethics' },
    { name: 'Open Access', href: '/open-access-policy' },
    { name: 'Copyright Claims', href: '/copyright-claims' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Refund Policy', href: '/refund-policy' },
    { name: 'Terms & Conditions', href: '/terms-conditions' },
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'Payment Terms', href: '/payment-terms' },
  ];

  return (
    <main className="reveal">
        {/* POLICY HEADER */}
        <PageHero>
            <div className="container">
                <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Legal & Ethical Framework</div>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{title}</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>{subtitle}</p>
            </div>
        </PageHero>

        {/* POLICY CONTENT */}
        <section style={{ padding: '6rem 0' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '4rem' }}>
                
                <div className="policy-main">
                    <div className="beauty-card" style={{ padding: '4rem', margin: 0 }}>
                        <div className="article-body" style={{ fontSize: '1.05rem' }}>
                            {children}
                        </div>
                    </div>
                    
                    <div style={{ marginTop: '4rem', padding: '2rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', textAlign: 'center' }}>
                       <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          For scholarly ethics inquiries, please contact our Editorial Office at <strong style={{ color: 'var(--accent)' }}>editorial@wisdomj.in</strong>
                       </p>
                    </div>
                </div>

                {/* POLICY SIDEBAR */}
                <aside className="policy-sidebar">
                   <div style={{ position: 'sticky', top: 'calc(var(--nav-height) + 2rem)' }}>
                      <h3 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Full Policy Index</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                         {policies.map((p) => (
                            <Link 
                               key={p.href} 
                               href={p.href} 
                               className="policy-link"
                            >
                               {p.name}
                            </Link>
                         ))}
                      </div>
                   </div>
                </aside>

            </div>
        </section>
    </main>
  );
}
