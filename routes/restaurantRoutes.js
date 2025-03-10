const express = require('express');
const restaurantController = require('../controllers/restaurantController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', restaurantController.getRestaurants);
router.get('/:id', restaurantController.getRestaurantById);
router.post('/', auth, restaurantController.addRestaurant);
router.put('/:id', auth, restaurantController.updateRestaurant);
router.delete('/:id', auth, restaurantController.deleteRestaurant);

module.exports = router;