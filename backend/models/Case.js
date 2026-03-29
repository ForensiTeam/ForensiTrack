const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const caseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { 
    type: String, 
    required: true,
    enum: ['Dusuk', 'Orta', 'Yuksek', 'Kritik'],
    default: 'Orta'
  },
  status: { 
    type: String, 
    required: true,
    enum: ['Acik', 'Cozuldu', 'Incelemede'],
    default: 'Acik'
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  notes: [noteSchema]
}, { timestamps: true });

module.exports = mongoose.model('Case', caseSchema);
