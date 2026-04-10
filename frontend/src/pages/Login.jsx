import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API_BASE from '../api';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        navigate('/ads');
      } else {
        setError(data.message || 'Giris basarisiz');
      }
    } catch (err) {
      setError('Sunucuya baglanilamadi. Lutfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="glass-panel auth-card">
        <h2 style={{ textAlign: 'center' }}>Hoş Geldiniz</h2>
        <p style={{ textAlign: 'center' }}>ForensiTrack hesabınıza erişim sağlayın</p>
        
        {error && <div className="alert alert-error">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">E-posta Adresi</label>
            <input 
              className="input-field" 
              type="email" 
              placeholder="uzman@forensitrack.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label className="input-label">Şifre</label>
            <input 
              className="input-field" 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button 
            className="btn-primary" 
            type="submit" 
            disabled={loading}
            style={{ width: '100%', marginTop: '0.5rem', padding: '0.8rem', fontSize: '0.95rem' }}
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
        
        <p style={{ marginTop: '1.75rem', textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Hesabınız yok mu?{' '}
          <Link to="/register" className="link">Kayıt Ol</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
