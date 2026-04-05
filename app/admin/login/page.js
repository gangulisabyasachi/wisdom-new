import { connectDB } from '../../../lib/db';
import User from '../../../lib/models/User';
import { createSession } from '../../../lib/session';
import { redirect } from 'next/navigation';

export default function LoginPage() {
  
  async function handleLogin(formData) {
    'use server';
    
    const email = formData.get('email');
    const password = formData.get('password');

    await connectDB();
    const user = await User.findOne({ email }).lean();

    if (!user || user.password !== password) {
      // In a real sophisticated app, we'd use useActionState to return errors.
      // For this isolated admin portal, redirecting back with a query param works nicely.
      redirect('/admin/login?error=Invalid credentials');
    }

    // Success! Create session
    await createSession(user._id.toString());
    redirect('/admin');
  }

  return (
    <div className="admin-mode" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'radial-gradient(circle at top right, #fff1f2, #f8fafc)',
      padding: '2rem'
    }}>
      <div className="admin-card reveal" style={{ maxWidth: '450px', width: '100%', padding: '3.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ 
            display: 'inline-flex', 
            padding: '1rem', 
            background: '#fff1f2', 
            borderRadius: '16px', 
            color: 'var(--admin-primary)',
            marginBottom: '1.5rem'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
          </div>
          <h2 className="admin-page-title" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>WISDOM Portal</h2>
          <p style={{ color: 'var(--admin-text-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>
            Authorized Editor Access Only
          </p>
        </div>

        <form action={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <div>
            <label className="admin-label" htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="admin-input" 
              placeholder="editor@wisdomj.in" 
              required 
            />
          </div>
          
          <div>
            <label className="admin-label" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="admin-input" 
              placeholder="••••••••" 
              required 
            />
          </div>

          <button type="submit" className="admin-btn admin-btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem', fontSize: '1rem' }}>
            Sign In to Dashboard
          </button>
        </form>

        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <Link href="/" style={{ color: 'var(--admin-text-secondary)', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700 }}>
            ← Return to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
