const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, caseController.createCase); // G9
router.patch('/:caseId/priority', authMiddleware, caseController.updatePriority); // G10
router.patch('/:caseId/status', authMiddleware, caseController.updateStatus); // G11
router.post('/:caseId/notes', authMiddleware, caseController.addNote); // G12

module.exports = router;
