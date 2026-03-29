// Author: Ümmühan Atmaca - G9-G16 Gereksinimleri
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  toolId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tool', required: true },
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
