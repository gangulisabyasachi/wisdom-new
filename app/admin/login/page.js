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
    <div className="admin-login-box">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', margin: '0' }}>WISDOM Admin</h2>
        <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '0.9rem' }}>Sign in to manage journals and announcements.</p>
      </div>

      <form action={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label className="admin-label" htmlFor="email" style={{ marginTop: 0 }}>Email Address</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="admin-input" 
            placeholder="admin@example.com" 
            required 
          />
        </div>
        
        <div>
          <label className="admin-label" htmlFor="password" style={{ marginTop: 0 }}>Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            className="admin-input" 
            placeholder="••••••••" 
            required 
          />
        </div>

        <button type="submit" className="admin-btn admin-btn-primary" style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', fontSize: '1rem' }}>
          Sign In
        </button>
      </form>
    </div>
  );
}
