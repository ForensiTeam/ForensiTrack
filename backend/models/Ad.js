const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Bellek Adli Bilisimi', 'Disk Adli Bilisimi', 'Mobil Adli Bilisimi', 'Ag Adli Bilisimi', 'Bulut Adli Bilisimi']
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Ad', adSchema);
