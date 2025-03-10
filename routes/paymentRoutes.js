const express = require('express');
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/create-order', auth, paymentController.createPaymentOrder);
router.post('/verify', auth, paymentController.verifyPayment);

module.exports = router;