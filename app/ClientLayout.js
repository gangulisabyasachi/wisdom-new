'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ScrollToTop from './components/ScrollToTop';

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
                A high-impact, multidisciplinary research journal dedicated to advancing knowledge and promoting innovation through rigorous scholarly dialogue.
              </p>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '1px' }}>Official Identification</span>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  <div style={{ fontSize: '0.9rem' }}><strong>ISSN (P):</strong> 3108-0499</div>
                  <div style={{ fontSize: '0.9rem' }}><strong>ISSN (E):</strong> 3108-351X</div>
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
              &copy; 2026 Jayasree Publications. All scholarly content is preserved for worldwide academic exchange.
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
