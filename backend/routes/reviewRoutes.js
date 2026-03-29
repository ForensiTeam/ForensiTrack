const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/rate', authMiddleware, reviewController.rateTool); // G15
router.post('/comment', authMiddleware, reviewController.commentTool); // G16

module.exports = router;
