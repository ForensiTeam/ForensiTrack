const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  adId: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
