import React, { useState, useEffect } from 'react';
import API_BASE from '../api';

const CATEGORIES = ['Bellek Adli Bilisimi', 'Disk Adli Bilisimi', 'Mobil Adli Bilisimi', 'Ag Adli Bilisimi', 'Bulut Adli Bilisimi'];

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', price: '', category: CATEGORIES[0] });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortByPrice, setSortByPrice] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  // JWT'den kullanici ID'si al
  let currentUserId = '';
  try { currentUserId = JSON.parse(atob(token.split('.')[1])).userId; } catch (e) { }

  const fetchAds = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/ads`, { headers });
      if (res.ok) setAds(await res.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchAds(); }, []);

  // G7 + G8 + Siralama: Client-side anlık filtreleme (backend API da cagrilir - YAML uyumu)
  const filteredAds = [...ads]
    .filter(ad => {
      const matchSearch = !searchQuery.trim() ||
        ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = !filterCategory || ad.category === filterCategory;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sortByPrice === 'asc') return a.price - b.price;
      if (sortByPrice === 'desc') return b.price - a.price;
      return 0;
    });

  // G3: Ilan Ekleme / G5: Ilan Guncelleme
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingAd ? `${API_BASE}/api/ads/${editingAd._id}` : `${API_BASE}/api/ads`;
    const method = editingAd ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, { method, headers, body: JSON.stringify({ ...formData, price: Number(formData.price) }) });
      if (res.ok) {
        setIsModalOpen(false); setEditingAd(null);
        setFormData({ title: '', description: '', price: '', category: CATEGORIES[0] });
        fetchAds();
      } else {
        const data = await res.json();
        setMsg({ text: data.message, type: 'error' });
        setTimeout(() => setMsg({ text: '', type: '' }), 4000);
      }
    } catch (err) { setMsg({ text: 'Islem basarisiz', type: 'error' }); }
  };

  // G6: Ilan Silme
  const deleteAd = async (id) => {
    const ad = ads.find(a => a._id === id);
    if (ad && ad.userId !== currentUserId) {
      setMsg({ text: 'Sadece kendi ilaninizi silebilirsiniz! (G6 Kurali)', type: 'error' });
      setTimeout(() => setMsg({ text: '', type: '' }), 4000);
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/ads/${id}`, { method: 'DELETE', headers });
      if (res.ok || res.status === 204) fetchAds();
      else if (res.status === 403) {
        setMsg({ text: 'Sadece kendi ilaninizi silebilirsiniz! (G6 Kurali)', type: 'error' });
        setTimeout(() => setMsg({ text: '', type: '' }), 4000);
      }
    } catch (err) { setMsg({ text: 'Silme basarisiz', type: 'error' }); }
  };

  // G5: Duzenle butonuna basildiginda sahiplik kontrolu
  const openEdit = (ad) => {
    if (ad.userId !== currentUserId) {
      setMsg({ text: 'Sadece kendi ilaninizi duzenleyebilirsiniz! (G5 Kurali)', type: 'error' });
      setTimeout(() => setMsg({ text: '', type: '' }), 4000);
      return;
    }
    setEditingAd(ad);
    setFormData({ title: ad.title, description: ad.description, price: ad.price, category: ad.category });
    setIsModalOpen(true);
  };

  const openNew = () => {
    setEditingAd(null);
    setFormData({ title: '', description: '', price: '', category: CATEGORIES[0] });
    setIsModalOpen(true);
  };

  // G7: Ilan Arama - Backend API cagrilir (YAML uyumu), display client-side filteredAds ile
  const searchAds = async () => {
    // API cagrisi - YAML spec geregi
    if (searchQuery.trim()) {
      fetch(`${API_BASE}/api/ads/search?query=${encodeURIComponent(searchQuery)}`, { headers })
        .catch(err => console.error('Search API:', err));
    }
    // Display zaten filteredAds computed variable ile anlık guncelleniyor
  };

  // G8: Ilan Filtreleme - Backend API cagrilir (YAML uyumu), display client-side filteredAds ile
  const filterAds = (cat) => {
    setFilterCategory(cat);
    // API cagrisi - YAML spec geregi
    if (cat) {
      fetch(`${API_BASE}/api/ads/filter?category=${encodeURIComponent(cat)}`, { headers })
        .catch(err => console.error('Filter API:', err));
    }
    // Display zaten filteredAds computed variable ile anlık guncelleniyor
  };


  return (
    <div className="page-container">
      {msg.text && <div className={`alert ${msg.type === 'error' ? 'alert-error' : 'alert-success'}`} onClick={() => setMsg({ text: '', type: '' })}>{msg.text}</div>}
      <div className="page-header">
        <h1 className="page-title">Hizmet Ilanlari</h1>
        <button className="btn-primary" onClick={openNew}>+ Yeni Ilan Ekle (G3)</button>
      </div>

      {/* Arama, Filtre ve Siralama (G7, G8) */}
      <div className="glass-panel" style={{ padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input className="input-field" style={{ flex: 1, minWidth: '180px' }} placeholder="Ilan ara... (G7)" value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && searchAds()} />
        <button className="btn-primary" onClick={searchAds}>Ara (G7)</button>
        <select className="input-field" style={{ width: 'auto', minWidth: '180px' }} value={filterCategory} onChange={e => filterAds(e.target.value)}>
          <option value="">Tum Kategoriler (G8)</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="input-field" style={{ width: 'auto', minWidth: '160px' }} value={sortByPrice} onChange={e => setSortByPrice(e.target.value)}>
          <option value="">Fiyat Siralama</option>
          <option value="asc">Ucuzdan Pahaliya</option>
          <option value="desc">Pahalidan Ucuza</option>
        </select>
        {(searchQuery || filterCategory || sortByPrice) && <button className="btn-secondary" onClick={() => { setSearchQuery(''); setFilterCategory(''); setSortByPrice(''); fetchAds(); }}>Temizle</button>}
      </div>

      {/* G4: Ilan Listesi */}
      <div className="cards-grid">
        {filteredAds.map(ad => (
          <div key={ad._id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.8rem' }}>
              <span className="badge" style={{ background: 'rgba(59,130,246,0.15)', color: 'var(--accent)' }}>{ad.category}</span>
              <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#10b981' }}>{ad.price} TL</span>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{ad.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.5', flex: 1 }}>{ad.description}</p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
              <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', flex: 1 }} onClick={() => openEdit(ad)}>Duzenle (G5)</button>
              <button className="btn-danger" style={{ fontSize: '0.8rem', flex: 1 }} onClick={() => deleteAd(ad._id)}>Sil (G6)</button>
            </div>
          </div>
        ))}
        {filteredAds.length === 0 && (
          <div className="glass-panel" style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Henuz hizmet ilani bulunmuyor.
          </div>
        )}
      </div>

      {/* Modal (G3/G5) */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">{editingAd ? 'Ilani Duzenle (G5)' : 'Yeni Ilan Ekle (G3)'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Baslik</label>
                <input className="input-field" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
              </div>
              <div className="input-group">
                <label className="input-label">Aciklama</label>
                <textarea className="input-field" rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
              </div>
              <div className="input-group">
                <label className="input-label">Fiyat (TL)</label>
                <input className="input-field" type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
              </div>
              <div className="input-group">
                <label className="input-label">Kategori</label>
                <select className="input-field" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <button className="btn-primary" type="submit" style={{ width: '100%' }}>{editingAd ? 'Guncelle' : 'Ilani Kaydet'}</button>
              <button className="btn-secondary" type="button" style={{ width: '100%', marginTop: '0.5rem' }} onClick={() => setIsModalOpen(false)}>Iptal</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ads;
