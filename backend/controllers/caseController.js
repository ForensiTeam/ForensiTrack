const Case = require('../models/Case');

// G9: Vaka Oluşturma
exports.createCase = async (req, res) => {
  try {
    const { title, description, priority, assignedExpert } = req.body;
    const newCase = new Case({
      title, description, priority, assignedExpert, userId: req.user.userId
    });
    await newCase.save();
    res.status(201).json(newCase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// G10: Vaka Önceliklendirme
exports.updatePriority = async (req, res) => {
  try {
    const { caseId } = req.params;
    const { priority } = req.body;
    const updatedCase = await Case.findByIdAndUpdate(caseId, { priority }, { new: true });
    if (!updatedCase) return res.status(404).json({ message: 'Vaka bulunamadı' });
    res.status(200).json(updatedCase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// G11: Vaka Durum Güncelleme
exports.updateStatus = async (req, res) => {
  try {
    const { caseId } = req.params;
    const { status } = req.body;
    const updatedCase = await Case.findByIdAndUpdate(caseId, { status }, { new: true });
    if (!updatedCase) return res.status(404).json({ message: 'Vaka bulunamadı' });
    res.status(200).json(updatedCase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// G12: Not Ekleme
exports.addNote = async (req, res) => {
  try {
    const { caseId } = req.params;
    const { note } = req.body;
    const caseDoc = await Case.findById(caseId);
    if (!caseDoc) return res.status(404).json({ message: 'Vaka bulunamadı' });
    
    caseDoc.notes.push({ note });
    await caseDoc.save();
    res.status(201).json(caseDoc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
