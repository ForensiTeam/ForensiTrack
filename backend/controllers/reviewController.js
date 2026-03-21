const Review = require('../models/Review');

// G15: Puan Verme
exports.rateAd = async (req, res) => {
  try {
    const { adId, rating } = req.body;
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    const review = new Review({ adId, rating, userId: req.user.userId });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// G16: Yorum Yapma
exports.commentAd = async (req, res) => {
  try {
    const { adId, comment } = req.body;
    if (!comment) {
      return res.status(400).json({ message: 'Comment text is required' });
    }
    // Eger bu user evelden yorum yaptiysa veya o an rate verildiyse ayni review icine alalim
    // Kolaylik olsun diye yeni bir review kaydediyoruz
    const review = new Review({ adId, comment, userId: req.user.userId });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
