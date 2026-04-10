// Author: Ümmühan Atmaca - G9-G16 Gereksinimleri
import React, { useState, useEffect } from 'react';
import API_BASE from '../api';

const priorityConfig = {
  'Kritik': { color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.1)' },
  'Yuksek': { color: '#fb923c', bg: 'rgba(251, 146, 60, 0.1)' },
  'Orta':   { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)' },
  'Dusuk':  { color: '#34d399', bg: 'rgba(52, 211, 153, 0.1)' },
};

const statusConfig = {
  'Acik':       { color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.1)' },
  'Incelemede': { color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.1)' },
  'Cozuldu':    { color: '#34d399', bg: 'rgba(52, 211, 153, 0.1)' },
};

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', priority: 'Orta' });
  const [noteContent, setNoteContent] = useState({});
  const [msg, setMsg] = useState({ text: '', type: '' });
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  const fetchCases = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/cases`, { headers });
      if (res.ok) setCases(await res.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchCases(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/cases`, { method: 'POST', headers, body: JSON.stringify(formData) });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ title: '', description: '', priority: 'Orta' });
        setMsg({ text: 'Vaka başarıyla oluşturuldu!', type: 'success' });
        fetchCases();
        setTimeout(() => setMsg({ text: '', type: '' }), 3000);
      }
    } catch (err) {
      setMsg({ text: 'Vaka oluşturulamadı', type: 'error' });
      setTimeout(() => setMsg({ text: '', type: '' }), 4000);
    }
  };

  const updatePriority = async (id, priority) => {
    try {
      await fetch(`${API_BASE}/api/cases/${id}/priority`, { method: 'PATCH', headers, body: JSON.stringify({ priority }) });
      fetchCases();
    } catch (err) { console.error(err); }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API_BASE}/api/cases/${id}/status`, { method: 'PATCH', headers, body: JSON.stringify({ status }) });
      fetchCases();
    } catch (err) { console.error(err); }
  };

  const addNote = async (id) => {
    const content = noteContent[id];
    if (!content || !content.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/api/cases/${id}/notes`, { method: 'POST', headers, body: JSON.stringify({ content }) });
      if (res.ok) {
        setNoteContent({ ...noteContent, [id]: '' });
        fetchCases();
      }
    } catch (err) { console.error(err); }
  };

  // Stats
  const openCount = cases.filter(c => c.status === 'Acik').length;
  const reviewCount = cases.filter(c => c.status === 'Incelemede').length;
  const solvedCount = cases.filter(c => c.status === 'Cozuldu').length;
  const criticalCount = cases.filter(c => c.priority === 'Kritik' || c.priority === 'Yuksek').length;

  return (
    <div className="page-container">
      {msg.text && (
        <div className={`alert ${msg.type === 'error' ? 'alert-error' : 'alert-success'}`}>
          {msg.type === 'error' ? '' : ''}{msg.text}
        </div>
      )}

      <div className="page-header">
        <div>
          <h1 className="page-title">Vaka Yönetimi</h1>
          <p className="page-subtitle">Adli inceleme vakalarınızı takip edin</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          + Yeni Vaka
        </button>
      </div>

      {/* Stats */}
      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--accent)' }}>{cases.length}</div>
          <div className="stat-label">Toplam Vaka</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: statusConfig['Acik'].color }}>{openCount}</div>
          <div className="stat-label">Açık</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: statusConfig['Incelemede'].color }}>{reviewCount}</div>
          <div className="stat-label">İncelemede</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: statusConfig['Cozuldu'].color }}>{solvedCount}</div>
          <div className="stat-label">Çözüldü</div>
        </div>
      </div>

      {/* Case Cards */}
      <div className="cards-grid">
        {cases.map(c => {
          const pConf = priorityConfig[c.priority] || priorityConfig['Orta'];
          const sConf = statusConfig[c.status] || statusConfig['Acik'];
          return (
            <div key={c._id} className="glass-panel case-card">
              <div className="case-card-selects">
                <div className="case-select-group">
                  <label>Öncelik</label>
                  <select
                    className="input-field"
                    value={c.priority}
                    onChange={e => updatePriority(c._id, e.target.value)}
                    style={{ padding: '0.45rem 0.6rem', color: pConf.color, fontWeight: '600', fontSize: '0.85rem' }}
                  >
                    {Object.keys(priorityConfig).map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div className="case-select-group">
                  <label>Durum</label>
                  <select
                    className="input-field"
                    value={c.status}
                    onChange={e => updateStatus(c._id, e.target.value)}
                    style={{ padding: '0.45rem 0.6rem', color: sConf.color, fontWeight: '600', fontSize: '0.85rem' }}
                  >
                    {Object.keys(statusConfig).map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <h3 className="case-card-title">{c.title}</h3>
              <p className="case-card-desc">{c.description}</p>

              {/* Notes Section */}
              <div className="case-notes-section">
                <div className="case-notes-title">
                  Vaka Notları ({c.notes?.length || 0})
                </div>
                {c.notes && c.notes.length > 0 ? (
                  <ul className="notes-list">
                    {c.notes.map((n, i) => (
                      <li key={i}>{n.content || n.note || n.text || JSON.stringify(n)}</li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    Henüz not eklenmemiş.
                  </p>
                )}
                <div className="note-input-row">
                  <input
                    className="input-field"
                    placeholder="Yeni not yazın..."
                    value={noteContent[c._id] || ''}
                    onChange={e => setNoteContent({...noteContent, [c._id]: e.target.value})}
                    onKeyDown={e => e.key === 'Enter' && addNote(c._id)}
                  />
                  <button className="btn-primary" onClick={() => addNote(c._id)}>Ekle</button>
                </div>
              </div>
            </div>
          );
        })}
        {cases.length === 0 && (
          <div className="glass-panel empty-state">
            <div className="empty-state-icon"></div>
            <p className="empty-state-text">Henüz vaka bulunmuyor.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">Yeni Vaka Oluştur</h2>
            <form onSubmit={handleCreate}>
              <div className="input-group">
                <label className="input-label">Vaka Başlığı</label>
                <input className="input-field" placeholder="Vaka adı" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
              </div>
              <div className="input-group">
                <label className="input-label">Açıklama</label>
                <textarea className="input-field" rows="3" placeholder="Vaka detayları..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
              </div>
              <div className="input-group">
                <label className="input-label">Öncelik</label>
                <select className="input-field" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
                  {Object.keys(priorityConfig).map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <button className="btn-primary" type="submit" style={{ width: '100%', padding: '0.75rem' }}>Vakayı Kaydet</button>
              <button className="btn-secondary" type="button" style={{ width: '100%', marginTop: '0.5rem' }} onClick={() => setIsModalOpen(false)}>İptal</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cases;
