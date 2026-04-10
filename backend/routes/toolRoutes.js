const express = require('express');
const router = express.Router();
const toolController = require('../controllers/toolController');
const authMiddleware = require('../middleware/authMiddleware');

// GUVENLIK K3: Seed endpoint'ine authMiddleware eklendi
router.post('/seed', authMiddleware, toolController.seedTools); // Helper Setup
router.get('/', authMiddleware, toolController.getTools); // G13
router.get('/:toolId', authMiddleware, toolController.getToolById); // G14

module.exports = router;
