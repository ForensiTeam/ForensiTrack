import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API_BASE from '../api';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Hesap başarıyla oluşturuldu! Yönlendiriliyorsunuz...');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(data.message || 'Kayıt başarısız');
      }
    } catch (err) {
      setError('Sunucuya bağlanılamadı. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="glass-panel auth-card">
        <h2 style={{ textAlign: 'center' }}>Hesap Oluştur</h2>
        <p style={{ textAlign: 'center' }}>ForensiTrack platformuna katılın</p>
        
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label className="input-label">Kullanıcı Adı</label>
            <input 
              className="input-field" 
              type="text" 
              placeholder="ornekuzman" 
              value={form.username} 
              onChange={e => setForm({...form, username: e.target.value})} 
              required 
              minLength={3}
              maxLength={30}
            />
          </div>
          <div className="input-group">
            <label className="input-label">E-posta Adresi</label>
            <input 
              className="input-field" 
              type="email" 
              placeholder="uzman@forensitrack.com" 
              value={form.email} 
              onChange={e => setForm({...form, email: e.target.value})} 
              required 
            />
          </div>
          <div className="input-group">
            <label className="input-label">Şifre</label>
            <input 
              className="input-field" 
              type="password" 
              placeholder="••••••••" 
              value={form.password} 
              onChange={e => setForm({...form, password: e.target.value})} 
              required 
              minLength={6}
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem', display: 'block' }}>
              En az 6 karakter
            </span>
          </div>
          <button 
            className="btn-primary" 
            type="submit" 
            disabled={loading}
            style={{ width: '100%', marginTop: '0.5rem', padding: '0.8rem', fontSize: '0.95rem' }}
          >
            {loading ? 'Hesap oluşturuluyor...' : 'Kayıt Ol'}
          </button>
        </form>
        
        <p style={{ marginTop: '1.75rem', textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Zaten hesabınız var mı?{' '}
          <Link to="/login" className="link">Giriş Yap</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
