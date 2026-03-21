import React, { useState, useEffect } from 'react';

const Ads = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/ads', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      if (response.ok) setAds(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>İlanlar (G4)</h2>
      <ul>
        {ads.map(ad => (
          <li key={ad._id}>
            <h4>{ad.title}</h4>
            <p>{ad.description}</p>
            <b>{ad.price} TL</b> - <i>{ad.category}</i>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ads;
