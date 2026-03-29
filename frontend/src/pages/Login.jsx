import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API_BASE from '../api';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
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
      setError('Sunucuya baglanilamadi');
    }
  };

  return (
    <div className="auth-container">
      <div className="glass-panel auth-card">
        <h2>Giris Yap</h2>
        <p>ForensiTrack hesabiniza erisim saglayin</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">E-posta</label>
            <input className="input-field" type="email" placeholder="ornek@forensitrack.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label className="input-label">Sifre</label>
            <input className="input-field" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button className="btn-primary" type="submit" style={{ width: '100%', marginTop: '0.5rem' }}>Giris Yap (G2)</button>
        </form>
        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Hesabiniz yok mu? <Link to="/register" className="link">Kayit Ol</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
