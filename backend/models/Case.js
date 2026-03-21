const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['Kritik', 'Yuksek', 'Orta', 'Dusuk'], required: true },
  status: { type: String, enum: ['Acik', 'Cozuldu', 'Incelemede'], default: 'Acik' },
  assignedExpert: { type: String },
  notes: [{
    note: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Case', caseSchema);
