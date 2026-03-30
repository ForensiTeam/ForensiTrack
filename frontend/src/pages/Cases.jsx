// Author: Ümmühan Atmaca - G9-G16 Gereksinimleri
import React, { useState, useEffect } from 'react';
import API_BASE from '../api';

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', priority: 'Orta' });
  const [noteContent, setNoteContent] = useState({});
  const [msg, setMsg] = useState('');
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  const fetchCases = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/cases`, { headers });
      if (res.ok) {
        const data = await res.json();
        setCases(data);
      }
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchCases(); }, []);

  // G9: Vaka Olusturma
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/cases`, { method: 'POST', headers, body: JSON.stringify(formData) });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ title: '', description: '', priority: 'Orta' });
        setMsg('Vaka basariyla olusturuldu!');
        fetchCases();
        setTimeout(() => setMsg(''), 3000);
      }
    } catch (err) { setMsg('Vaka olusturulamadi'); }
  };

  // G10: Vaka Onceliklendirme
  const updatePriority = async (id, priority) => {
    try {
      await fetch(`${API_BASE}/api/cases/${id}/priority`, { method: 'PATCH', headers, body: JSON.stringify({ priority }) });
      fetchCases();
    } catch (err) { console.error(err); }
  };

  // G11: Vaka Durum Guncelleme
  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API_BASE}/api/cases/${id}/status`, { method: 'PATCH', headers, body: JSON.stringify({ status }) });
      fetchCases();
    } catch (err) { console.error(err); }
  };

  // G12: Not Ekleme
  const addNote = async (id) => {
    const content = noteContent[id];
    if (!content || !content.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/api/cases/${id}/notes`, { method: 'POST', headers, body: JSON.stringify({ content }) });
      if (res.ok) {
        setNoteContent({ ...noteContent, [id]: '' });
        fetchCases();
      } else {
        console.error('Not ekleme hatasi:', await res.text());
      }
    } catch (err) { console.error(err); }
  };

  const getPriorityColor = (p) => {
    switch(p) { case 'Kritik': return '#ef4444'; case 'Yuksek': return '#f97316'; case 'Orta': return '#eab308'; case 'Dusuk': return '#22c55e'; default: return '#60a5fa'; }
  };
  const getStatusColor = (s) => {
    switch(s) { case 'Acik': return '#3b82f6'; case 'Incelemede': return '#a855f7'; case 'Cozuldu': return '#10b981'; default: return '#60a5fa'; }
  };

  return (
    <div className="page-container">
      {msg && <div className="alert alert-success">{msg}</div>}
      <div className="page-header">
        <h1 className="page-title">Vakalarim</h1>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>+ Yeni Vaka Olustur (G9)</button>
      </div>

      <div className="cards-grid">
        {cases.map(c => (
          <div key={c._id} className="glass-panel" style={{ padding: '1.5rem' }}>
            {/* Oncelik & Durum (G10, G11) */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Oncelik (G10)</span>
                <select className="input-field" value={c.priority} onChange={e => updatePriority(c._id, e.target.value)}
                  style={{ padding: '0.4rem', marginTop: '0.2rem', color: getPriorityColor(c.priority), fontWeight: 'bold' }}>
                  <option value="Dusuk">Dusuk</option>
                  <option value="Orta">Orta</option>
                  <option value="Yuksek">Yuksek</option>
                  <option value="Kritik">Kritik</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Durum (G11)</span>
                <select className="input-field" value={c.status} onChange={e => updateStatus(c._id, e.target.value)}
                  style={{ padding: '0.4rem', marginTop: '0.2rem', color: getStatusColor(c.status), fontWeight: 'bold' }}>
                  <option value="Acik">Acik</option>
                  <option value="Incelemede">Incelemede</option>
                  <option value="Cozuldu">Cozuldu</option>
                </select>
              </div>
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginBottom: '0.4rem' }}>{c.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>{c.description}</p>

            {/* Notlar (G12) */}
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '10px' }}>
              <h4 style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>Vaka Notlari (G12)</h4>
              {c.notes && c.notes.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0, maxHeight: '120px', overflowY: 'auto', marginBottom: '0.8rem' }}>
                  {c.notes.map((n, i) => (
                    <li key={i} style={{ fontSize: '0.8rem', marginBottom: '0.3rem', paddingBottom: '0.3rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-primary)' }}>
                      📝 {n.content || n.note || n.text || JSON.stringify(n)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>Henuz not eklenmemis.</p>
              )}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input className="input-field" placeholder="Yeni not yazin... (G12)" value={noteContent[c._id] || ''}
                  onChange={e => setNoteContent({...noteContent, [c._id]: e.target.value})}
                  onKeyDown={e => e.key === 'Enter' && addNote(c._id)} style={{ padding: '0.5rem' }} />
                <button className="btn-primary" style={{ padding: '0.5rem 1rem', whiteSpace: 'nowrap' }} onClick={() => addNote(c._id)}>Ekle (G12)</button>
              </div>
            </div>
          </div>
        ))}
        {cases.length === 0 && (
          <div className="glass-panel" style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Henuz vaka bulunmuyor.
          </div>
        )}
      </div>

      {/* Modal (G9) */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">Yeni Vaka Olustur (G9)</h2>
            <form onSubmit={handleCreate}>
              <div className="input-group">
                <label className="input-label">Vaka Basligi</label>
                <input className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
              </div>
              <div className="input-group">
                <label className="input-label">Aciklama</label>
                <textarea className="input-field" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
              </div>
              <div className="input-group">
                <label className="input-label">Oncelik</label>
                <select className="input-field" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
                  <option value="Dusuk">Dusuk</option>
                  <option value="Orta">Orta</option>
                  <option value="Yuksek">Yuksek</option>
                  <option value="Kritik">Kritik</option>
                </select>
              </div>
              <button className="btn-primary" type="submit" style={{ width: '100%' }}>Vakayi Kaydet</button>
              <button className="btn-secondary" type="button" style={{ width: '100%', marginTop: '0.5rem' }} onClick={() => setIsModalOpen(false)}>Iptal</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cases;
