const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/search', authMiddleware, adController.searchAds); // G7
router.get('/filter', authMiddleware, adController.filterAds); // G8
router.post('/', authMiddleware, adController.createAd); // G3
router.get('/', authMiddleware, adController.getAds); // G4
router.put('/:adId', authMiddleware, adController.updateAd); // G5
router.delete('/:adId', authMiddleware, adController.deleteAd); // G6

module.exports = router;
