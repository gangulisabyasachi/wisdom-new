import './admin.css';
import Link from 'next/link';
import { verifySession } from '../../lib/session';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'WISDOM Admin Portal',
};

export default async function AdminLayout({ children }) {
  const session = await verifySession();

  // If this is the login page (or some other public admin route)
  if (!session) {
    return (
      <div className="admin-mode admin-login-wrapper">
        {children}
      </div>
    );
  }

  // If logged in, render the full Dashboard shell
  return (
    <div className="admin-mode admin-layout-wrapper">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
           <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--admin-primary)' }}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
           WISDOM
        </div>
        <nav className="admin-sidebar-nav">
          <Link href="/admin" className="admin-nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Dashboard
          </Link>
          <Link href="/admin/journals" className="admin-nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            Journals
          </Link>
          <Link href="/admin/announcements" className="admin-nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2z"></path><path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2z"></path></svg>
            Announcements
          </Link>
        </nav>
        
        <div className="admin-logout">
          <form action="/admin/logout" method="POST">
            <button type="submit" className="admin-logout-btn">
              Logout Portal
            </button>
          </form>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div style={{ fontWeight: '800', color: 'var(--admin-text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Editor Control Center
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
             <Link href="/" target="_blank" className="admin-btn admin-btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                View Website ↗
             </Link>
          </div>
        </header>

        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
}
