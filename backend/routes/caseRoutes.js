const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');
const authMiddleware = require('../middleware/authMiddleware');
const Case = require('../models/Case');

// Vaka listeleme (GET)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const cases = await Case.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(cases);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authMiddleware, caseController.createCase); // G9
router.patch('/:caseId/priority', authMiddleware, caseController.updatePriority); // G10
router.patch('/:caseId/status', authMiddleware, caseController.updateStatus); // G11
router.post('/:caseId/notes', authMiddleware, caseController.addNote); // G12

module.exports = router;
