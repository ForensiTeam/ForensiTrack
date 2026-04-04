const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// MongoDB Connection
const connectDB = async () => {
  try {
    // Sabitlenmiş MongoDB Bağlantı Adresi (Hardcoded)
    const mongoUri = "mongodb+srv://yiquitto:Zxcv123.@cluster0.ybbe51p.mongodb.net/ForensiDB?appName=Cluster0";
    if (!mongoUri) {
      throw new Error("MONGO_URI bulunamadi! Lutfen .env dosyasini kontrol et.");
    }
    console.log("MongoDB Atlas veritabanina baglaniliyor...");
    await mongoose.connect(mongoUri);
    console.log("MongoDB (Atlas) Basariyla Baglandi");
  } catch (err) {
    console.error("MongoDB Atlas Baglanti Hatasi: ", err);
  }
};
connectDB();

const app = express();
app.use(express.json());

// CORS: Hem yerel gelistirme hem de Vercel icin acik
const corsOptions = {
  origin: true,
  credentials: true
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    // Render Uyuma Engelleyici: Her 14 dakikada kendi kendine ping at
    // Render ucretsiz planda 15 dk istek gelmezse sunucuyu uyutur.
    // Bu kod sunucunun hic uyumamasini saglar.
    const SELF_URL = 'https://forensitrack-api.onrender.com';
    setInterval(() => {
        const https = require('https');
        https.get(SELF_URL, (res) => {
            console.log(`[Keep-Alive] Render ping gonderildi - Durum: ${res.statusCode}`);
        }).on('error', (err) => {
            console.error('[Keep-Alive] Ping hatasi:', err.message);
        });
    }, 14 * 60 * 1000); // 14 dakika
});
