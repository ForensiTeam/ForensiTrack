import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API_BASE from '../api';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Hesap basariyla olusturuldu! Giris sayfasina yonlendiriliyorsunuz...');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(data.message || 'Kayit basarisiz');
      }
    } catch (err) {
      setError('Sunucuya baglanilamadi');
    }
  };

  return (
    <div className="auth-container">
      <div className="glass-panel auth-card">
        <h2>Kayit Ol</h2>
        <p>ForensiTrack platformuna katilarak hizmet verin</p>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label className="input-label">Kullanici Adi</label>
            <input className="input-field" type="text" placeholder="uzman_adi" value={form.username} onChange={e => setForm({...form, username: e.target.value})} required />
          </div>
          <div className="input-group">
            <label className="input-label">E-posta</label>
            <input className="input-field" type="email" placeholder="ornek@forensitrack.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          </div>
          <div className="input-group">
            <label className="input-label">Sifre</label>
            <input className="input-field" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
          </div>
          <button className="btn-primary" type="submit" style={{ width: '100%', marginTop: '0.5rem' }}>Kayit Ol (G1)</button>
        </form>
        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Zaten hesabiniz var mi? <Link to="/login" className="link">Giris Yap</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
