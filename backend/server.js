const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

// CORS: PUT/DELETE preflight icin tum metodlar ve headerlar acik
const corsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

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
const MONGO_URI = "mongodb+srv://forensiuser:ForensiPass2024@cluster0.e6youn0.mongodb.net/ForensiDB?appName=Cluster0";

// Sunucu HEMEN basliyor (Render health check icin zorunlu)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// MongoDB ARKA PLANDA baglanıyor - sunucu hata verse de devam eder
const connectDB = async () => {
  try {
    console.log("MongoDB Atlas veritabanina baglaniliyor...");
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB (Atlas) Basariyla Baglandi");

    // Render Uyuma Engelleyici: Her 14 dakikada kendi kendine ping
    const https = require('https');
    setInterval(() => {
      https.get('https://forensitrack-api.onrender.com', (res) => {
        console.log(`[Keep-Alive] Ping - Durum: ${res.statusCode}`);
      }).on('error', (err) => {
        console.error('[Keep-Alive] Hata:', err.message);
      });
    }, 14 * 60 * 1000);

  } catch (err) {
    console.error("MongoDB Baglanti Hatasi:", err.message);
    console.log("30 saniye sonra tekrar deneniyor...");
    setTimeout(connectDB, 30000); // crash etme, yeniden dene
  }
};

connectDB();
