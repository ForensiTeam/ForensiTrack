// Author: Ümmühan Atmaca - G9-G16 Gereksinimleri
import React, { useState, useEffect } from 'react';
import API_BASE from '../api';

const categoryIcons = {
  'Bellek Analizi': 'BA',
  'Disk Analizi': 'DA',
  'Ag Analizi': 'AA',
  'Mobil Analiz': 'MA',
  'Sifreleme': 'SI',
  'Kapsamlı İnceleme': 'KI',
  'Açık Kaynak Analiz': 'AK',
  'Bellek (RAM) Analizi': 'RA',
  'Mobil İnceleme': 'MI',
  'Mobil & Bulut İnceleme': 'MB',
  'Tersine Mühendislik': 'TM',
};

const Tools = () => {
  const [tools, setTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  const fetchTools = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/tools`, { headers });
      if (res.ok) setTools(await res.json());
    } catch (err) { console.error(err); }
    setIsLoading(false);
  };

  useEffect(() => { fetchTools(); }, []);

  const seedTools = async () => {
    try {
      await fetch(`${API_BASE}/api/tools/seed`, { method: 'POST', headers });
      fetchTools();
    } catch (err) { console.error(err); }
  };

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

  const submitReview = async (e) => {
    e.preventDefault();
    if (!selectedTool) return;
    try {
      await fetch(`${API_BASE}/api/reviews/rate`, {
        method: 'POST', headers,
        body: JSON.stringify({ toolId: selectedTool._id, rating: Number(reviewForm.rating) })
      });

      if (reviewForm.comment.trim()) {
        await fetch(`${API_BASE}/api/reviews/comment`, {
          method: 'POST', headers,
          body: JSON.stringify({ toolId: selectedTool._id, comment: reviewForm.comment })
        });
      }

      setReviewForm({ rating: 5, comment: '' });
      await openDetail(selectedTool._id);
      fetchTools();
      setMsg({ text: 'Değerlendirmeniz kaydedildi!', type: 'success' });
      setTimeout(() => setMsg({ text: '', type: '' }), 3000);
    } catch (err) { console.error(err); }
  };

  // Stats
  const avgRating = tools.length > 0
    ? (tools.reduce((sum, t) => sum + (t.overallRating || 0), 0) / tools.length).toFixed(1)
    : '0.0';
  const categories = [...new Set(tools.map(t => t.category))];

  if (isLoading) return null;

  return (
    <div className="page-container">
      {msg.text && (
        <div className={`alert ${msg.type === 'error' ? 'alert-error' : 'alert-success'}`}>
          {msg.type === 'error' ? '' : ''}{msg.text}
        </div>
      )}

      <div className="page-header">
        <div>
          <h1 className="page-title">Adli Bilişim Araçları</h1>
          <p className="page-subtitle">Profesyonel dijital adli analiz yazılımları</p>
        </div>
        {tools.length === 0 && (
          <button className="btn-primary" onClick={seedTools}>
            Araç Veritabanını Doldur
          </button>
        )}
      </div>

      {/* Stats */}
      {tools.length > 0 && (
        <div className="stat-row">
          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--accent)' }}>{tools.length}</div>
            <div className="stat-label">Toplam Araç</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--warning)' }}>★ {avgRating}</div>
            <div className="stat-label">Ortalama Puan</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--purple)' }}>{categories.length}</div>
            <div className="stat-label">Kategori</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--success)' }}>
              {tools.filter(t => (t.overallRating || 0) >= 4.5).length}
            </div>
            <div className="stat-label">Premium Araç</div>
          </div>
        </div>
      )}

      {/* Tool Cards */}
      <div className="cards-grid">
        {tools.map(tool => (
          <div key={tool._id} className="glass-panel tool-card" onClick={() => openDetail(tool._id)}>
            <div className="tool-card-header">
              <div className="tool-card-icon">
                {categoryIcons[tool.category] || 'FT'}
              </div>
              <span className="badge" style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                {tool.category}
              </span>
            </div>
            <h3 className="tool-card-name">{tool.name}</h3>
            <p className="tool-card-desc">
              {tool.description && tool.description.length > 110 ? tool.description.substring(0, 110) + '...' : tool.description}
            </p>
            <div className="tool-card-footer">
              <span className="tool-rating">★ {(tool.overallRating || 0).toFixed(1)}</span>
              <span className="tool-cta">Detaylar →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tool Detail Modal */}
      {selectedTool && (
        <div className="modal-overlay" onClick={() => setSelectedTool(null)}>
          <div className="modal-content" style={{ maxWidth: '650px' }} onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <span className="badge" style={{ background: 'var(--accent-subtle)', color: 'var(--accent)', marginBottom: '0.5rem', display: 'inline-block' }}>
                  {selectedTool.category}
                </span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800', marginTop: '0.3rem', letterSpacing: '-0.02em' }}>{selectedTool.name}</h2>
                <span className="tool-rating" style={{ fontSize: '0.95rem' }}>★ {(selectedTool.overallRating || 0).toFixed(1)} Ortalama Puan</span>
              </div>
              <button className="btn-secondary" onClick={() => setSelectedTool(null)} style={{ padding: '0.35rem 0.8rem', fontSize: '0.8rem' }}>Kapat</button>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.65', marginBottom: '1.5rem' }}>{selectedTool.description}</p>

            <div className="divider" />

            {/* Reviews */}
            <h3 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.75rem', marginTop: '0.5rem' }}>
              Kullanıcı Değerlendirmeleri ({reviews.length})
            </h3>
            <div style={{ maxHeight: '250px', overflowY: 'auto', marginBottom: '1.25rem' }}>
              {reviews.length > 0 ? reviews.map((r, i) => (
                <div key={i} className="review-item">
                  <div className="review-header">
                    <div className="review-user">
                      <div className="review-avatar">
                        {((r.userId && typeof r.userId === 'object') ? (r.userId.username || 'K')[0] : 'K').toUpperCase()}
                      </div>
                      <span className="review-username">
                        @{(r.userId && typeof r.userId === 'object') ? (r.userId.username || 'kullanıcı') : 'kullanıcı'}
                      </span>
                    </div>
                    {r.rating && (
                      <span className="review-stars">
                        {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                      </span>
                    )}
                  </div>
                  {r.comment && <p className="review-comment">"{r.comment}"</p>}
                </div>
              )) : (
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Henüz değerlendirme yok. İlk yorumu sen yap!</p>
                </div>
              )}
            </div>

            <div className="divider" />

            {/* Review Form */}
            <h3 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.75rem', marginTop: '0.5rem' }}>
              Deneyimini Paylaş
            </h3>
            <form onSubmit={submitReview} className="review-form">
              <div className="input-group" style={{ marginBottom: '0.85rem' }}>
                <label className="input-label">Puan</label>
                <select className="input-field" value={reviewForm.rating} onChange={e => setReviewForm({...reviewForm, rating: e.target.value})}>
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{'★'.repeat(n)}{'☆'.repeat(5-n)} ({n}/5)</option>)}
                </select>
              </div>
              <div className="input-group" style={{ marginBottom: '0.85rem' }}>
                <label className="input-label">Yorum (Opsiyonel)</label>
                <textarea
                  className="input-field"
                  rows="2"
                  placeholder="Bu araç hakkındaki düşünceleriniz..."
                  value={reviewForm.comment}
                  onChange={e => setReviewForm({...reviewForm, comment: e.target.value})}
                  maxLength={1000}
                />
              </div>
              <button className="btn-primary" type="submit" style={{ width: '100%' }}>Değerlendirmeyi Gönder</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tools;
