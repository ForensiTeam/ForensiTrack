import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'uzman' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        alert('Kayıt başarılı, lütfen giriş yapın');
        window.location.href = '/login';
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Kayıt başarısız');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username: </label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Email: </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Role: </label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="uzman">Uzman</option>
            <option value="musteri">Müşteri</option>
          </select>
        </div>
        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
};

export default Register;
