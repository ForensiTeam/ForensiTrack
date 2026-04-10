import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Ads from './pages/Ads';
import Cases from './pages/Cases';
import Tools from './pages/Tools';
import './index.css';

const Navigation = ({ isAuthenticated, handleLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  const onLogout = () => { handleLogout(); navigate('/login'); };

  return (
    <nav className="glass-panel navbar">
      <div className="logo">
        <span>Forensi</span><span>Track</span>
      </div>
      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <Link to="/ads" className={isActive('/ads')}>İlanlar</Link>
            <Link to="/cases" className={isActive('/cases')}>Vakalarım</Link>
            <Link to="/tools" className={isActive('/tools')}>Araçlar</Link>
            <button className="btn-logout" onClick={onLogout}>Çıkış Yap</button>
          </>
        ) : (
          <>
            <Link to="/login" className={isActive('/login')}>Giriş Yap</Link>
            <Link to="/register" className={isActive('/register')}>
              <span className="btn-primary" style={{ padding: '0.45rem 1.1rem', fontSize: '0.85rem' }}>Kayıt Ol</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) return <Navigate to="/login" />;
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => { setIsAuthenticated(!!localStorage.getItem('token')); }, []);

  const handleLogout = () => { localStorage.removeItem('token'); setIsAuthenticated(false); };

  return (
    <Router>
      <Navigation isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/ads" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/ads" />} />
        <Route path="/ads" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Ads /></ProtectedRoute>} />
        <Route path="/cases" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Cases /></ProtectedRoute>} />
        <Route path="/tools" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Tools /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/ads" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
