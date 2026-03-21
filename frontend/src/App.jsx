import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Ads from './pages/Ads';

function App() {
  return (
    <Router>
      <div style={{ padding: '1rem', background: '#f4f4f4' }}>
        <nav>
          <Link style={{ marginRight: '1rem' }} to="/login">Giriş Yap</Link>
          <Link style={{ marginRight: '1rem' }} to="/register">Kayıt Ol</Link>
          <Link style={{ marginRight: '1rem' }} to="/ads">İlanlar</Link>
        </nav>
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ads" element={<Ads />} />
      </Routes>
    </Router>
  );
}

export default App;
