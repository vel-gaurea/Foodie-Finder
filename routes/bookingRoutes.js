const express = require('express');
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, bookingController.bookTable);
router.get('/', auth, bookingController.getUserBookings);
router.delete('/:id', auth, bookingController.cancelBooking);

module.exports = router;