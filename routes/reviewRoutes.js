const express = require('express');
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, reviewController.addReview);
router.get('/restaurant/:id', reviewController.getRestaurantReviews);
router.delete('/:id', auth, reviewController.deleteReview);

module.exports = router;