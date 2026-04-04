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
  // We can loosely check by lack of session or by path, but wait, 
  // children inside app/admin/login will also receive this layout if not careful.
  // The middleware protects /admin, but if user goes to /admin/login, they have no session.
  // We can just render the children plainly if there's no session (meaning it's the login page).
  if (!session) {
    return (
      <div className="admin-login-wrapper">
        {children}
      </div>
    );
  }

  // If logged in, render the full Dashboard shell
  return (
    <div className="admin-mode admin-layout-wrapper">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          WISDOM Admin
        </div>
        <nav className="admin-sidebar-nav">
          <Link href="/admin" className="admin-nav-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Dashboard
          </Link>
          <Link href="/admin/journals" className="admin-nav-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            Journals
          </Link>
          <Link href="/admin/announcements" className="admin-nav-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2z"></path><path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2z"></path></svg>
            Announcements
          </Link>
        </nav>
        
        <div className="admin-logout">
          <form action="/admin/logout" method="POST">
            <button type="submit" className="admin-logout-btn">
              Logout
            </button>
          </form>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div style={{ fontWeight: '500', color: '#64748b' }}>
            Welcome back to the dashboard!
          </div>
        </header>

        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
}
