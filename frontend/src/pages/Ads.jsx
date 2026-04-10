import React, { useState, useEffect } from 'react';
import API_BASE from '../api';

const CATEGORIES = ['Bellek Adli Bilisimi', 'Disk Adli Bilisimi', 'Mobil Adli Bilisimi', 'Ag Adli Bilisimi', 'Bulut Adli Bilisimi'];

const categoryIcons = {
  'Bellek Adli Bilisimi': 'BA',
  'Disk Adli Bilisimi': 'DA',
  'Mobil Adli Bilisimi': 'MA',
  'Ag Adli Bilisimi': 'AA',
  'Bulut Adli Bilisimi': 'BU',
};

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', price: '', category: CATEGORIES[0] });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortByPrice, setSortByPrice] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  let currentUserId = '';
  try { currentUserId = JSON.parse(atob(token.split('.')[1])).userId; } catch (e) { }

  const isOwner = (ad) => {
    const adUser = ad.userId?._id || ad.userId;
    return String(adUser) === String(currentUserId);
  };

  const fetchAds = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/ads`, { headers });
      if (res.ok) setAds(await res.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchAds(); }, []);

  const displayAds = [...ads]
    .filter(ad => {
      const matchSearch = !activeSearch.trim() ||
        ad.title.toLowerCase().includes(activeSearch.toLowerCase()) ||
        ad.description.toLowerCase().includes(activeSearch.toLowerCase());
      const matchCategory = !filterCategory || ad.category === filterCategory;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sortByPrice === 'asc') return a.price - b.price;
      if (sortByPrice === 'desc') return b.price - a.price;
      return 0;
    });

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
        setMsg({ text: editingAd ? 'İlan güncellendi' : 'İlan oluşturuldu', type: 'success' });
        setTimeout(() => setMsg({ text: '', type: '' }), 3000);
      } else {
        const data = await res.json();
        setMsg({ text: data.message, type: 'error' });
        setTimeout(() => setMsg({ text: '', type: '' }), 4000);
      }
    } catch (err) {
      setMsg({ text: 'İşlem başarısız: ' + err.message, type: 'error' });
      setTimeout(() => setMsg({ text: '', type: '' }), 4000);
    }
  };

  const deleteAd = async (id) => {
    const ad = ads.find(a => a._id === id);
    if (ad && !isOwner(ad)) {
      setMsg({ text: 'Sadece kendi ilanınızı silebilirsiniz.', type: 'error' });
      setTimeout(() => setMsg({ text: '', type: '' }), 4000);
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/ads/${id}`, {
        method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok || res.status === 204) {
        fetchAds();
        setMsg({ text: 'İlan silindi', type: 'success' });
        setTimeout(() => setMsg({ text: '', type: '' }), 3000);
      } else {
        const data = await res.json().catch(() => ({}));
        setMsg({ text: data.message || 'Silme başarısız', type: 'error' });
        setTimeout(() => setMsg({ text: '', type: '' }), 4000);
      }
    } catch (err) {
      setMsg({ text: 'Silme başarısız: ' + err.message, type: 'error' });
      setTimeout(() => setMsg({ text: '', type: '' }), 4000);
    }
  };

  const openEdit = (ad) => {
    if (!isOwner(ad)) {
      setMsg({ text: 'Sadece kendi ilanınızı düzenleyebilirsiniz.', type: 'error' });
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

  const searchAds = () => {
    setActiveSearch(searchQuery);
    if (searchQuery.trim()) {
      fetch(`${API_BASE}/api/ads/search?query=${encodeURIComponent(searchQuery)}`, { headers })
        .catch(err => console.error('Search API:', err));
    }
  };

  const filterAds = (cat) => {
    setFilterCategory(cat);
    if (cat) {
      fetch(`${API_BASE}/api/ads/filter?category=${encodeURIComponent(cat)}`, { headers })
        .catch(err => console.error('Filter API:', err));
    }
  };

  const clearFilters = () => {
    setSearchQuery(''); setActiveSearch(''); setFilterCategory(''); setSortByPrice('');
  };

  return (
    <div className="page-container">
      {msg.text && (
        <div className={`alert ${msg.type === 'error' ? 'alert-error' : 'alert-success'}`} onClick={() => setMsg({ text: '', type: '' })}>
          {msg.type === 'error' ? '' : ''}{msg.text}
        </div>
      )}

      <div className="page-header">
        <div>
          <h1 className="page-title">Hizmet İlanları</h1>
          <p className="page-subtitle">Adli bilişim uzmanlarının hizmet teklifleri</p>
        </div>
        <button className="btn-primary" onClick={openNew}>
          + Yeni İlan
        </button>
      </div>

      {/* Stats */}
      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--accent)' }}>{ads.length}</div>
          <div className="stat-label">Toplam İlan</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--success)' }}>
            {ads.length > 0 ? Math.min(...ads.map(a => a.price)).toLocaleString('tr-TR') + ' ₺' : '—'}
          </div>
          <div className="stat-label">En Düşük Fiyat</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--warning)' }}>
            {ads.length > 0 ? Math.max(...ads.map(a => a.price)).toLocaleString('tr-TR') + ' ₺' : '—'}
          </div>
          <div className="stat-label">En Yüksek Fiyat</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--purple)' }}>
            {new Set(ads.map(a => a.category)).size}
          </div>
          <div className="stat-label">Kategori</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel filter-bar">
        <div className="search-wrapper">
          <input
            className="input-field"
            placeholder="İlan ara..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && searchAds()}
          />
        </div>
        <button className="btn-primary" onClick={searchAds} style={{ padding: '0.65rem 1.2rem' }}>Ara</button>
        <select className="input-field" style={{ width: 'auto', minWidth: '180px' }} value={filterCategory} onChange={e => filterAds(e.target.value)}>
          <option value="">Tüm Kategoriler</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="input-field" style={{ width: 'auto', minWidth: '155px' }} value={sortByPrice} onChange={e => setSortByPrice(e.target.value)}>
          <option value="">Fiyat Sırala</option>
          <option value="asc">Ucuzdan → Pahalıya</option>
          <option value="desc">Pahalıdan → Ucuza</option>
        </select>
        {(searchQuery || activeSearch || filterCategory || sortByPrice) && (
          <button className="btn-secondary" onClick={clearFilters} style={{ padding: '0.65rem 1rem' }}>Temizle</button>
        )}
      </div>

      {/* Ad Cards */}
      <div className="cards-grid">
        {displayAds.map(ad => (
          <div key={ad._id} className="glass-panel ad-card">
            <div className="ad-card-header">
              <span className="badge" style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                {ad.category}
              </span>
              <span className="ad-card-price">{ad.price.toLocaleString('tr-TR')} ₺</span>
            </div>
            <h3 className="ad-card-title">{ad.title}</h3>
            <p className="ad-card-desc">{ad.description}</p>
            <div className="ad-card-footer">
              <button className="btn-secondary" style={{ fontSize: '0.82rem', padding: '0.45rem 0.8rem' }} onClick={() => openEdit(ad)}>
                Düzenle
              </button>
              <button className="btn-danger" onClick={() => deleteAd(ad._id)}>
                Sil
              </button>
            </div>
          </div>
        ))}
        {displayAds.length === 0 && (
          <div className="glass-panel empty-state">
            <div className="empty-state-icon"></div>
            <p className="empty-state-text">Henüz hizmet ilanı bulunmuyor.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">{editingAd ? 'İlanı Düzenle' : 'Yeni İlan Oluştur'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Başlık</label>
                <input className="input-field" placeholder="Hizmet başlığı" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
              </div>
              <div className="input-group">
                <label className="input-label">Açıklama</label>
                <textarea className="input-field" rows="3" placeholder="Hizmet detayları..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
              </div>
              <div className="input-group">
                <label className="input-label">Fiyat (₺)</label>
                <input className="input-field" type="number" min="0" placeholder="1500" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
              </div>
              <div className="input-group">
                <label className="input-label">Kategori</label>
                <select className="input-field" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <button className="btn-primary" type="submit" style={{ width: '100%', padding: '0.75rem' }}>
                {editingAd ? 'Güncelle' : 'İlanı Yayınla'}
              </button>
              <button className="btn-secondary" type="button" style={{ width: '100%', marginTop: '0.5rem' }} onClick={() => setIsModalOpen(false)}>
                İptal
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ads;
