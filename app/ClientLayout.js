'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ScrollToTop from './components/ScrollToTop';

// --- MAGNETIC COMPONENT FOR PREMIUM INTERACTION ---
function MagneticLink({ href, children, className, ariaLabel }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 ? 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
        display: 'inline-flex'
      }}
    >
      {children}
    </a>
  );
}

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  
  // Smoothly interpolate spotlight position
  useEffect(() => {
    let animationFrameId;
    const updatePosition = () => {
      setMousePos(prev => ({
        x: prev.x + (targetPos.x - prev.x) * 0.15,
        y: prev.y + (targetPos.y - prev.y) * 0.15
      }));
      animationFrameId = requestAnimationFrame(updatePosition);
    };
    animationFrameId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetPos]);

  const handleMouseMove = (e) => {
    setTargetPos({ x: e.clientX, y: e.clientY });
  };
  
  const isAdmin = pathname?.startsWith('/admin');

  // Handle scroll effect for glassmorphic header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  if (isAdmin) {
    return <main>{children}</main>;
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Editorial Board', href: '/editorial-board' },
    { name: 'Current Issue', href: '/current-issue' },
    { name: 'Archives', href: '/archives' },
    { name: 'Call for Papers', href: '/call-for-papers' },
    { name: 'Contact', href: '/contact' },
    { name: 'Search', href: '/search' },
  ];

  return (
    <div onMouseMove={handleMouseMove} style={{ position: 'relative', minHeight: '100vh' }}>
      <div 
        className="global-spotlight"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, var(--accent-light), transparent 80%)`,
          zIndex: 9999,
          opacity: 0.15,
          transition: 'opacity 0.3s ease',
        }}
      />
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <nav className="nav-container container">
          <Link href="/" className="nav-logo">
            <h1>WISDOM</h1>
          </Link>

          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/call-for-papers" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem', marginLeft: '1rem' }}>
              Submit Paper
            </Link>
          </div>

          <button 
            className="nav-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className="bar" style={{ transform: isMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : '' }}></span>
            <span className="bar" style={{ opacity: isMenuOpen ? 0 : 1 }}></span>
            <span className="bar" style={{ transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : '' }}></span>
          </button>
        </nav>
        
        <style jsx>{`
          @media (max-width: 968px) {
            .nav-menu {
              position: fixed;
              top: var(--nav-height);
              left: 0;
              width: 100%;
              height: calc(100vh - var(--nav-height));
              background: var(--bg);
              display: ${isMenuOpen ? 'flex' : 'none'};
              flex-direction: column;
              padding: 2rem;
              gap: 1.5rem;
              overflow-y: auto;
              border-top: 1px solid var(--border);
            }
            .nav-menu.active {
              display: flex;
            }
          }
        `}</style>
      </header>

      <main style={{ minHeight: '80vh' }}>{children}</main>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-main">
              <h3>WISDOM</h3>
              <p>
                Uniting Research, Unlocking Wisdom
              </p>
                            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.8rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '2px' }}>Official Identification</span>
                <div style={{ display: 'flex', gap: '3rem' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600 }}><a href="https://portal.issn.org/resource/ISSN/3108-0499" target="_blank"><strong>ISSN (P):</strong> 3108-0499</a></div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600 }}><a href="https://portal.issn.org/resource/ISSN/3108-351X" target="_blank"><strong>ISSN (E):</strong> 3108-351X</a></div>
                </div>
                
                {/* ORGANIC SOCIAL ISLAND SEPARATOR */}
                <div className="social-island">
                  <span style={{ fontSize: '0.75rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', display: 'block' }}>Social Links</span>
                  <div className="social-grid-orbital">
                    <MagneticLink 
                      href="https://www.facebook.com/profile.php?id=61580071364691" 
                      className="social-orbital-link facebook" 
                      ariaLabel="Facebook"
                    >
                      <div className="orbital-halo"></div>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="social-icon-orbital"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </MagneticLink>

                    <MagneticLink 
                      href="https://www.instagram.com/wisdomjournal25/" 
                      className="social-orbital-link instagram" 
                      ariaLabel="Instagram"
                    >
                      <div className="orbital-halo"></div>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="social-icon-orbital"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    </MagneticLink>

                    <MagneticLink 
                      href="https://www.linkedin.com/company/wisdom-journal/" 
                      className="social-orbital-link linkedin" 
                      ariaLabel="LinkedIn"
                    >
                      <div className="orbital-halo"></div>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="social-icon-orbital"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                    </MagneticLink>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer-links">
              <h4>Journal Menu</h4>
              <ul>
                <li><Link href="/about">About WISDOM</Link></li>
                <li><Link href="/editorial-board">Editorial Board</Link></li>
                <li><Link href="/current-issue">Current Issue</Link></li>
                <li><Link href="/archives">Archives</Link></li>
                <li><Link href="/call-for-papers">Submit Your Paper</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Scholarly Policies</h4>
              <ul>
                <li><Link href="/peer-review-policy">Peer Review Policy</Link></li>
                <li><Link href="/cope-ethics">Publication Ethics (COPE)</Link></li>
                <li><Link href="/open-access-policy">Open Access Policy</Link></li>
                <li><Link href="/copyright-claims">Copyright Transfer</Link></li>
                <li><Link href="/disclaimer">Legal Disclaimer</Link></li>
                <li><Link href="/privacy-policy">Privacy & Data</Link></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="copyright">
              &copy; {new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', year: 'numeric' }).format(new Date())} Jayasree Publications. All scholarly content is preserved for worldwide academic exchange.
            </div>
            <div className="license" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              Licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" style={{ color: 'var(--accent)', fontWeight: 600 }}>CC BY 4.0</a>
              <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="CC" width="20" />
              <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="BY" width="20" />
            </div>
          </div>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  );
}
