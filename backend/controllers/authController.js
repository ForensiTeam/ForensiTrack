const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // GUVENLIK O2: Input validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Tum alanlar zorunludur.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Sifre en az 6 karakter olmalidir.' });
    }
    if (username.length < 3 || username.length > 30) {
      return res.status(400).json({ message: 'Kullanici adi 3-30 karakter arasinda olmalidir.' });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(409).json({ message: 'Kullanıcı zaten mevcut' });

    // GUVENLIK K4: role body'den ALINMAZ, her zaman default 'uzman'
    user = new User({ username, email, password, role: 'uzman' });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu' });
  } catch (err) {
    // GUVENLIK O3: Ic hata detaylarini gizle
    console.error('Register hatasi:', err.message);
    res.status(400).json({ message: 'Kayit islemi basarisiz.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // GUVENLIK O2: Input validation
    if (!email || !password) {
      return res.status(400).json({ message: 'E-posta ve sifre zorunludur.' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Geçersiz e-posta veya şifre' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Geçersiz e-posta veya şifre' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, username: user.username });
  } catch (err) {
    // GUVENLIK O3: Ic hata detaylarini gizle
    console.error('Login hatasi:', err.message);
    res.status(500).json({ message: 'Giris islemi basarisiz.' });
  }
};
