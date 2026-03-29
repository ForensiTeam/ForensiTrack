// Author: Ümmühan Atmaca - G9-G16 Gereksinimleri
import React, { useState, useEffect } from 'react';
import API_BASE from '../api';

const Tools = () => {
  const [tools, setTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  // G13: Arac Listeleme
  const fetchTools = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/tools`, { headers });
      if (res.ok) setTools(await res.json());
    } catch (err) { console.error(err); }
    setIsLoading(false);
  };

  useEffect(() => { fetchTools(); }, []);

  // Seed helper
  const seedTools = async () => {
    try {
      await fetch(`${API_BASE}/api/tools/seed`, { method: 'POST', headers });
      fetchTools();
    } catch (err) { console.error(err); }
  };

  // G14: Arac Detay Goruntuleme
  const openDetail = async (toolId) => {
    try {
      const res = await fetch(`${API_BASE}/api/tools/${toolId}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setSelectedTool(data.tool);
        setReviews(data.reviews || []);
        setReviewForm({ rating: 5, comment: '' });
      }
    } catch (err) { console.error(err); }
  };

  // G15 + G16: Puan + Yorum Gonder
  const submitReview = async (e) => {
    e.preventDefault();
    if (!selectedTool) return;
    try {
      // G15: Puan Ver
      const rateRes = await fetch(`${API_BASE}/api/reviews/rate`, {
        method: 'POST', headers,
        body: JSON.stringify({ toolId: selectedTool._id, rating: Number(reviewForm.rating) })
      });
      console.log('G15 Puan:', rateRes.status);

      // G16: Yorum Yap
      if (reviewForm.comment.trim()) {
        const commentRes = await fetch(`${API_BASE}/api/reviews/comment`, {
          method: 'POST', headers,
          body: JSON.stringify({ toolId: selectedTool._id, comment: reviewForm.comment })
        });
        console.log('G16 Yorum:', commentRes.status);
      }

      setReviewForm({ rating: 5, comment: '' });
      // Yorumlari yeniden yukle
      await openDetail(selectedTool._id);
      fetchTools();
      setMsg('Degerlendirmeniz kaydedildi!');
      setTimeout(() => setMsg(''), 3000);
    } catch (err) { console.error(err); }
  };

  if (isLoading) return null;

  return (
    <div className="page-container">
      {msg && <div className="alert alert-success">{msg}</div>}
      <div className="page-header">
        <h1 className="page-title">Adli Bilisim Araclari (G13)</h1>
        {tools.length === 0 && <button className="btn-primary" onClick={seedTools}>Arac Veritabanini Doldur</button>}
      </div>

      {/* G13: Arac Kartlari */}
      <div className="cards-grid">
        {tools.map(tool => (
          <div key={tool._id} className="glass-panel" style={{ padding: '1.5rem', cursor: 'pointer', transition: 'transform 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            onClick={() => openDetail(tool._id)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '1.5rem' }}>ğŸ› ï¸</span>
              <span className="badge" style={{ background: 'rgba(59,130,246,0.15)', color: 'var(--accent)' }}>{tool.category}</span>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.4rem' }}>{tool.name}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.8rem', lineHeight: '1.5' }}>
              {tool.description && tool.description.length > 100 ? tool.description.substring(0, 100) + '...' : tool.description}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#eab308', fontSize: '0.9rem' }}>★ {(tool.overallRating || 0).toFixed(1)}</span>
              <span style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: '500' }}>Detaylari Goruntule (G14) →</span>
            </div>
          </div>
        ))}
      </div>

      {/* G14: Arac Detay Modal */}
      {selectedTool && (
        <div className="modal-overlay" onClick={() => setSelectedTool(null)}>
          <div className="modal-content" style={{ maxWidth: '650px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <div>
                <span className="badge" style={{ background: 'rgba(59,130,246,0.15)', color: 'var(--accent)', marginBottom: '0.5rem', display: 'inline-block' }}>{selectedTool.category}</span>
                <h2 style={{ fontSize: '1.3rem', fontWeight: '700' }}>{selectedTool.name}</h2>
                <span style={{ color: '#eab308', fontSize: '1rem' }}>★ {(selectedTool.overallRating || 0).toFixed(1)} Ortalama Puan</span>
              </div>
              <button className="btn-secondary" onClick={() => setSelectedTool(null)} style={{ padding: '0.3rem 0.8rem' }}>Kapat</button>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{selectedTool.description}</p>

            {/* Kullanici Degerlendirmeleri */}
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.8rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
              Kullanici Degerlendirmeleri ({reviews.length} yorum)
            </h3>
            <div style={{ maxHeight: '250px', overflowY: 'auto', marginBottom: '1.5rem' }}>
              {reviews.length > 0 ? reviews.map((r, i) => (
                <div key={i} style={{ background: 'rgba(0,0,0,0.25)', padding: '0.8rem 1rem', borderRadius: '10px', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ background: 'var(--accent)', borderRadius: '50%', width: '24px', height: '24px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.7rem' }}>👤</span>
                      <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--accent)' }}>
                        @{(r.userId && typeof r.userId === 'object') ? (r.userId.username || 'kullanici') : 'kullanici'}
                      </span>
                      <span className="badge" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', fontSize: '0.65rem' }}>Adli Uzman</span>
                    </div>
                    {r.rating && (
                      <span style={{ color: '#eab308', fontSize: '0.85rem', fontWeight: '600' }}>
                        {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                      </span>
                    )}
                  </div>
                  {r.comment && <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.3rem', lineHeight: '1.5' }}>"{r.comment}"</p>}
                </div>
              )) : (
                <div style={{ background: 'rgba(0,0,0,0.15)', padding: '1.5rem', borderRadius: '10px', textAlign: 'center' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Henuz degerlendirme yok. Ilk yorumu sen yap!</p>
                </div>
              )}
            </div>

            {/* G15 + G16: Degerlendirme Formu */}
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.8rem' }}>Deneyimini Paylas (G15-G16)</h3>
            <form onSubmit={submitReview} style={{ background: 'rgba(59,130,246,0.05)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(59,130,246,0.1)' }}>
              <div className="input-group">
                <label className="input-label">Puan Ver (G15)</label>
                <select className="input-field" value={reviewForm.rating} onChange={e => setReviewForm({...reviewForm, rating: e.target.value})}>
                  {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} - {'★'.repeat(n)}{'☆'.repeat(5-n)}</option>)}
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Yorum Yaz (G16)</label>
                <textarea className="input-field" rows="2" placeholder="Arac hakkindaki dusuncelerini yaz... (G16)" value={reviewForm.comment}
                  onChange={e => setReviewForm({...reviewForm, comment: e.target.value})} />
              </div>
              <button className="btn-primary" type="submit" style={{ width: '100%' }}>Gonder (G15-G16)</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tools;
