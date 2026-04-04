'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ScrollToTop from './components/ScrollToTop';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-logo">
              <h1>WISDOM</h1>
            </div>
            <div className="nav-menu" id="nav-menu">
              <Link href="/" className="nav-link" data-testid="link-nav-home">Home</Link>
              <Link href="/about" className="nav-link" data-testid="link-nav-about">About</Link>
              <Link href="/editorial-board" className="nav-link" data-testid="link-nav-editorial-board">Editorial Board</Link>
              <Link href="/current-issue" className="nav-link" data-testid="link-nav-current-issue">Current Issue</Link>
              <Link href="/archives" className="nav-link" data-testid="link-nav-archives">Archives</Link>
              <Link href="/call-for-papers" className="nav-link" data-testid="link-nav-submission">Call for Papers</Link>
              <Link href="/contact" className="nav-link" data-testid="link-nav-contact">Contact</Link>
              <Link href="/search" className="nav-link" data-testid="link-nav-search">Search</Link>
            </div>
            <div className="nav-toggle" id="nav-toggle" data-testid="button-mobile-menu">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer data-testid="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-main">
              <h3 data-testid="text-footer-title">WISDOM</h3>
              <p data-testid="text-footer-description">
                Uniting Research, Unlocking Wisdom
              </p>
              <div className="footer-info">
                <p data-testid="text-footer-issn">ISSN (P): 3108-0499</p>
                <p data-testid="text-footer-issn">ISSN (E): 3108-351X</p>
                <p data-testid="text-footer-publisher">Published by Jayasree Publications</p>
              </div>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><Link href="/about" data-testid="link-footer-about">About Journal</Link></li>
                <li><Link href="/editorial-board" data-testid="link-footer-editorial">Editorial Board</Link></li>
                <li><Link href="/call-for-papers" data-testid="link-footer-submission">Call for Papers</Link></li>
                <li><Link href="/contact" data-testid="link-footer-contact">Contact Us</Link></li>
              </ul>
            </div>

            <div className="footer-resources">
              <h4>Policies</h4>
              <ul>
                <li><Link href="/terms-conditions">Terms & Conditions</Link></li>
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/refund-policy">Refund Policy</Link></li>
                <li><Link href="/peer-review-policy">Peer Review Policy</Link></li>
                <li><Link href="/cope-ethics">COPE Ethics</Link></li>
                <li><Link href="/open-access-policy">Open Access Policy</Link></li>
                <li><Link href="/payment-terms">Payment Terms</Link></li>
                <li><Link href="/disclaimer">Disclaimer</Link></li>
                <li><Link href="/copyright-claims">Copyright Claims</Link></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p data-testid="text-footer-copyright">
              &copy; 2026 Jayasree Publications. All rights reserved.
            </p>
            <p data-testid="text-footer-copyright">This work is licensed under <a style={{ color: 'rgba(255, 255, 255, 0.6)' }} href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="" style={{ maxWidth: '1em', maxHeight: '1em', marginLeft: '.2em' }} /><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" style={{ maxWidth: '1em', maxHeight: '1em', marginLeft: '.2em' }} /></p>
          </div>
        </div>
      </footer>
      <ScrollToTop />
    </>
  );
}
