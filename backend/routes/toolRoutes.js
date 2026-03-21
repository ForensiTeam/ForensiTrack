const express = require('express');
const router = express.Router();
const toolController = require('../controllers/toolController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, toolController.getTools); // G13
router.get('/:toolId', authMiddleware, toolController.getToolDetails); // G14

module.exports = router;
