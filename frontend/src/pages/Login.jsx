import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Giriş başarılı');
        window.location.href = '/ads';
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Giriş başarısız');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email: </label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Şifre: </label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Giriş</button>
      </form>
    </div>
  );
};

export default Login;
