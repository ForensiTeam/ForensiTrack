const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// ===== FAIL-FAST: Kritik env degiskenleri kontrol =====
if (!process.env.MONGO_URI) {
  console.error('HATA: MONGO_URI ortam degiskeni tanimli degil!');
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error('HATA: JWT_SECRET ortam degiskeni tanimli degil!');
  process.exit(1);
}

const app = express();

// ===== GUVENLIK: Helmet ile HTTP security header'lari =====
app.use(helmet());

// ===== GUVENLIK: Request body boyut siniri (DoS onlemi) =====
app.use(express.json({ limit: '10kb' }));

// ===== GUVENLIK: CORS - sadece izin verilen origin'ler =====
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173'];

const corsOptions = {
  origin: function (origin, callback) {
    // origin undefined ise (Postman, curl vs.) veya whitelist'teyse izin ver
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS: Bu origin izin verilmedi'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// ===== GUVENLIK: Genel rate limiting (DDoS/Brute-force onlemi) =====
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // IP basina 15 dakikada max 100 istek
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Cok fazla istek gonderdiniz. Lutfen 15 dakika sonra tekrar deneyin.' }
});
app.use('/api/', generalLimiter);

// ===== GUVENLIK: Auth endpoint'leri icin siki rate limiting =====
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // 15 dakikada max 20 login/register denemesi
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Cok fazla giris denemesi. Lutfen 15 dakika sonra tekrar deneyin.' }
});

const authRoutes = require('./routes/authRoutes');
const adRoutes = require('./routes/adRoutes');
const caseRoutes = require('./routes/caseRoutes');
const toolRoutes = require('./routes/toolRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'ForensiTrack API is running!' });
});

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/tools', toolRoutes);
app.use('/api/reviews', reviewRoutes);

// ===== GUVENLIK: Genel hata yakalayici (bilgi sizdirma onlemi) =====
app.use((err, req, res, next) => {
  console.error('Sunucu hatasi:', err.message);
  res.status(500).json({ message: 'Sunucu hatasi olustu.' });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

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

    // Render Uyuma Engelleyici: Her 5 dakikada kendi kendine ping
    const renderUrl = process.env.RENDER_URL || 'https://forensitrack-api.onrender.com';
    const https = require('https');
    setInterval(() => {
      https.get(renderUrl, (res) => {
        console.log(`[Keep-Alive] Ping - Durum: ${res.statusCode}`);
      }).on('error', (err) => {
        console.error('[Keep-Alive] Hata:', err.message);
      });
    }, 5 * 60 * 1000);

  } catch (err) {
    console.error("MongoDB Baglanti Hatasi:", err.message);
    console.log("30 saniye sonra tekrar deneniyor...");
    setTimeout(connectDB, 30000); // crash etme, yeniden dene
  }
};

connectDB();
