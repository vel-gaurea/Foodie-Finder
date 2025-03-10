const Restaurant = require('../models/Restaurant');

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ msg: 'Restaurant not found' });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addRestaurant = async (req, res) => {
  const { name, location, cuisines, images, tables, availableTables, schedule } = req.body;
  try {
    const restaurant = new Restaurant({ name, location, cuisines, images, tables, availableTables, schedule });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRestaurant = async (req, res) => {
  const { name, location, cuisines, images, tables, availableTables, schedule } = req.body;
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, { name, location, cuisines, images, tables, availableTables, schedule }, { new: true });
    if (!restaurant) return res.status(404).json({ msg: 'Restaurant not found' });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) return res.status(404).json({ msg: 'Restaurant not found' });
    res.json({ msg: 'Restaurant deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};