const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
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
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
    ];
    if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS politikasi tarafindan engellendi: ' + origin));
    }
  },
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
});
