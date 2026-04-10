// Author: Ümmühan Atmaca - G9-G16 Gereksinimleri
const Case = require('../models/Case');

// G9: Vaka Olusturma
exports.createCase = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    // GUVENLIK O2: Input validation
    if (!title || !description) {
      return res.status(400).json({ message: 'Baslik ve aciklama zorunludur.' });
    }

    const newCase = new Case({
      title, description, priority, userId: req.user.userId
    });
    await newCase.save();
    res.status(201).json(newCase);
  } catch (err) {
    console.error('createCase hatasi:', err.message);
    res.status(400).json({ message: 'Vaka olusturulamadi.' });
  }
};

// G10: Vaka Onceliklendirme
exports.updatePriority = async (req, res) => {
  try {
    const { caseId } = req.params;
    const { priority } = req.body;

    // GUVENLIK O2: Gecerli oncelik degerleri kontrolu
    const validPriorities = ['Dusuk', 'Orta', 'Yuksek', 'Kritik'];
    if (!priority || !validPriorities.includes(priority)) {
      return res.status(400).json({ message: 'Gecersiz oncelik degeri.' });
    }

    // GUVENLIK Y3: Sahiplik kontrolu (IDOR onlemi)
    const caseDoc = await Case.findById(caseId);
    if (!caseDoc) return res.status(404).json({ message: 'Vaka bulunamadi' });
    if (caseDoc.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Bu vakayi guncelleme yetkiniz yok.' });
    }

    caseDoc.priority = priority;
    await caseDoc.save();
    res.status(200).json(caseDoc);
  } catch (err) {
    console.error('updatePriority hatasi:', err.message);
    res.status(400).json({ message: 'Oncelik guncellenemedi.' });
  }
};

// G11: Vaka Durum Guncelleme
exports.updateStatus = async (req, res) => {
  try {
    const { caseId } = req.params;
    const { status } = req.body;

    // GUVENLIK O2: Gecerli durum degerleri kontrolu
    const validStatuses = ['Acik', 'Cozuldu', 'Incelemede'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Gecersiz durum degeri.' });
    }

    // GUVENLIK Y3: Sahiplik kontrolu (IDOR onlemi)
    const caseDoc = await Case.findById(caseId);
    if (!caseDoc) return res.status(404).json({ message: 'Vaka bulunamadi' });
    if (caseDoc.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Bu vakayi guncelleme yetkiniz yok.' });
    }

    caseDoc.status = status;
    await caseDoc.save();
    res.status(200).json(caseDoc);
  } catch (err) {
    console.error('updateStatus hatasi:', err.message);
    res.status(400).json({ message: 'Durum guncellenemedi.' });
  }
};

// G12: Not Ekleme
exports.addNote = async (req, res) => {
  try {
    const { caseId } = req.params;
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Not icerigi bos olamaz.' });
    
    const caseDoc = await Case.findById(caseId);
    if (!caseDoc) return res.status(404).json({ message: 'Vaka bulunamadi' });

    // GUVENLIK Y3: Sahiplik kontrolu (IDOR onlemi)
    if (caseDoc.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Bu vakaya not ekleme yetkiniz yok.' });
    }
    
    caseDoc.notes.push({ userId: req.user.userId, content });
    await caseDoc.save();
    res.status(201).json(caseDoc);
  } catch (err) {
    console.error('addNote hatasi:', err.message);
    res.status(400).json({ message: 'Not eklenemedi.' });
  }
};
