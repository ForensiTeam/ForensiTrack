const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // GUVENLIK: JWT_SECRET yoksa istek isleme
  if (!process.env.JWT_SECRET) {
    console.error('KRITIK: JWT_SECRET ortam degiskeni tanimli degil!');
    return res.status(500).json({ message: 'Sunucu yapilandirma hatasi.' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Yetkilendirme token bulunamadi. Lutfen giris yapin.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Gecersiz veya suresi dolmus token.' });
  }
};

module.exports = authMiddleware;
