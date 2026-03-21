const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/rate', authMiddleware, reviewController.rateAd); // G15
router.post('/comment', authMiddleware, reviewController.commentAd); // G16

module.exports = router;
