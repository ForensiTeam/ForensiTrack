// Author: Ümmühan Atmaca - G9-G16 Gereksinimleri
const Review = require('../models/Review');
const Tool = require('../models/Tool');

// G15: Puan Verme (POST /api/reviews/rate)
exports.rateTool = async (req, res) => {
  try {
    const { toolId, rating } = req.body;
    if (!toolId || !rating) return res.status(400).json({ message: 'toolId ve rating zorunludur.' });

    // GUVENLIK O2: Rating deger kontrolu
    const numRating = Number(rating);
    if (!Number.isInteger(numRating) || numRating < 1 || numRating > 5) {
      return res.status(400).json({ message: 'Rating 1-5 arasinda bir tam sayi olmalidir.' });
    }

    // Aracin varligini kontrol et
    const tool = await Tool.findById(toolId);
    if (!tool) return res.status(404).json({ message: 'Arac bulunamadi.' });

    let review = await Review.findOne({ toolId, userId: req.user.userId });
    if (review) {
      review.rating = numRating;
      await review.save();
    } else {
      review = new Review({ toolId, userId: req.user.userId, rating: numRating });
      await review.save();
    }

    // Aracin Ortalama Puanini Guncelle
    const allReviews = await Review.find({ toolId, rating: { $exists: true, $ne: null } });
    if (allReviews.length > 0) {
      const average = allReviews.reduce((acc, curr) => acc + curr.rating, 0) / allReviews.length;
      await Tool.findByIdAndUpdate(toolId, { overallRating: average });
    }

    res.status(200).json(review);
  } catch (err) {
    console.error('rateTool hatasi:', err.message);
    res.status(400).json({ message: 'Puanlama basarisiz.' });
  }
};

// G16: Yorum Yapma (POST /api/reviews/comment)
exports.commentTool = async (req, res) => {
  try {
    const { toolId, comment } = req.body;
    if (!toolId || !comment) return res.status(400).json({ message: 'toolId ve comment zorunludur.' });

    // GUVENLIK O2: Yorum uzunluk kontrolu
    if (comment.length > 1000) {
      return res.status(400).json({ message: 'Yorum en fazla 1000 karakter olabilir.' });
    }

    // Aracin varligini kontrol et
    const tool = await Tool.findById(toolId);
    if (!tool) return res.status(404).json({ message: 'Arac bulunamadi.' });

    let review = await Review.findOne({ toolId, userId: req.user.userId });
    if (review) {
      review.comment = comment;
      await review.save();
    } else {
      review = new Review({ toolId, userId: req.user.userId, comment });
      await review.save();
    }
    
    res.status(200).json(review);
  } catch (err) {
    console.error('commentTool hatasi:', err.message);
    res.status(400).json({ message: 'Yorum basarisiz.' });
  }
};
