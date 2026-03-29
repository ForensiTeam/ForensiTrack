// Author: Ümmühan Atmaca - G9-G16 Gereksinimleri
const Review = require('../models/Review');
const Tool = require('../models/Tool');

// G15: Puan Verme (POST /api/reviews/rate)
exports.rateTool = async (req, res) => {
  try {
    const { toolId, rating } = req.body;
    if (!toolId || !rating) return res.status(400).json({ message: 'toolId ve rating zorunludur.' });

    let review = await Review.findOne({ toolId, userId: req.user.userId });
    if (review) {
      review.rating = rating;
      await review.save();
    } else {
      review = new Review({ toolId, userId: req.user.userId, rating });
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
    res.status(400).json({ message: err.message });
  }
};

// G16: Yorum Yapma (POST /api/reviews/comment)
exports.commentTool = async (req, res) => {
  try {
    const { toolId, comment } = req.body;
    if (!toolId || !comment) return res.status(400).json({ message: 'toolId ve comment zorunludur.' });

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
    res.status(400).json({ message: err.message });
  }
};
