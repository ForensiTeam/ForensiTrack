// Author: Ümmühan Atmaca - G9-G16 Gereksinimleri
const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['Bellek Analizi', 'Disk Analizi', 'Ag Analizi', 'Mobil Analiz', 'Sifreleme'] },
  description: { type: String, required: true },
  version: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Tool', toolSchema);
