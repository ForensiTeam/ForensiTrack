const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register); // G1
router.post('/login', authController.login); // G2

module.exports = router;
