const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

// CORS: Hem yerel gelistirme hem de Vercel icin acik
app.use(cors({ origin: true, credentials: true }));

const authRoutes = require('./routes/authRoutes');
const adRoutes = require('./routes/adRoutes');
const caseRoutes = require('./routes/caseRoutes');
const toolRoutes = require('./routes/toolRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Basic Route
app.get('/', (req, res) => {
    res.json({ message: 'ForensiTrack API is running!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/tools', toolRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb+srv://yiquitto:Zxcv123.@cluster0.ybbe51p.mongodb.net/ForensiDB?appName=Cluster0";

// MongoDB baglantisi TAMAMEN kurulduktan SONRA sunucuyu baslatiyoruz.
// Bu sayede Render'in soguk baslangicinda ilk istek timeout yemiyor.
console.log("MongoDB Atlas veritabanina baglaniliyor...");
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB (Atlas) Basariyla Baglandi");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);

      // Render Uyuma Engelleyici: Her 14 dakikada kendi kendine ping at
      const https = require('https');
      setInterval(() => {
        https.get('https://forensitrack-api.onrender.com', (res) => {
          console.log(`[Keep-Alive] Ping gonderildi - Durum: ${res.statusCode}`);
        }).on('error', (err) => {
          console.error('[Keep-Alive] Ping hatasi:', err.message);
        });
      }, 14 * 60 * 1000); // 14 dakika
    });
  })
  .catch((err) => {
    console.error("MongoDB Atlas Baglanti Hatasi: ", err);
    process.exit(1);
  });
