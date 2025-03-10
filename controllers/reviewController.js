const Review = require('../models/Review');
const Restaurant = require('../models/Restaurant');

exports.addReview = async (req, res) => {
  const { restaurantId, rating, comment } = req.body;
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ msg: 'Restaurant not found' });

    const review = new Review({ user: req.user._id, restaurant: restaurantId, rating, comment });
    await review.save();

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRestaurantReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ restaurant: req.params.id }).populate('user');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ msg: 'Review not found' });

    if (review.user.toString() !== req.user._id.toString()) return res.status(401).json({ msg: 'Unauthorized' });

    await review.remove();
    res.json({ msg: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};