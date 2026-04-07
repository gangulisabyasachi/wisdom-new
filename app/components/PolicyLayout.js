'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PageHero from './PageHero';
import ScrollReveal from './ScrollReveal';

export default function PolicyLayout({ title, subtitle, children }) {
  const pathname = usePathname();
  
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
    <main>
        {/* POLICY HEADER */}
        <PageHero>
            <div className="container">
                <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Legal & Ethical Framework</div>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', letterSpacing: '-1px' }}>{title}</h1>
                <div style={{ maxWidth: '600px' }}>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{subtitle}</p>
                </div>
            </div>
        </PageHero>

        {/* POLICY CONTENT */}
        <section style={{ padding: '4rem 0', background: 'var(--bg)' }}>

            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '5rem' }}>
                
                <div className="policy-main">
                    <ScrollReveal direction="up" delay={0.1}>
                      <div className="policy-card-glass" style={{ padding: '5rem 4rem 4rem', margin: 0 }}>
                          <div className="article-body">
                              {children}
                          </div>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal direction="up" delay={0.2}>
                      <div style={{ marginTop: '4rem', padding: '3rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                         <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent)' }}></div>
                         <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Scholarly Inquiries</h4>
                         <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
                            For specific questions regarding our ethical guidelines or data handling, please contact the Editorial Office:
                         </p>
                         <div style={{ marginTop: '1.5rem', display: 'inline-block', padding: '0.75rem 1.5rem', background: 'var(--bg-card)', borderRadius: '40px', border: '1px solid var(--border)' }}>
                            <strong style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>editorial@wisdomj.in</strong>
                         </div>
                      </div>
                    </ScrollReveal>
                </div>

                {/* POLICY SIDEBAR */}
                <aside className="policy-sidebar">
                    <ScrollReveal direction="right" delay={0.3}>
                      <div style={{ position: 'sticky', top: 'calc(var(--nav-height) + 4rem)' }}>
                        <div style={{ marginBottom: '2.5rem' }}>
                          <h3 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Policy Navigator</h3>
                          <div style={{ width: '40px', height: '2px', background: 'var(--accent)', opacity: 0.3 }}></div>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                           {policies.map((p) => {
                              const isActive = pathname === p.href;
                              return (
                                  <Link 
                                     key={p.href} 
                                     href={p.href} 
                                     className={`policy-link ${isActive ? 'active' : ''}`}
                                  >
                                     {p.name}
                                  </Link>
                              );
                           })}
                        </div>

                        <div style={{ marginTop: '4rem', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px dotted var(--border)', background: 'var(--bg-subtle)' }}>
                           <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                              All WISDOM policies are reviewed biannually by the Editorial Board to align with COPE and GDPR standards.
                           </p>
                        </div>
                      </div>
                    </ScrollReveal>
                </aside>

            </div>
        </section>
    </main>
  );
}
