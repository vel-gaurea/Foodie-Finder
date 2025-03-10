const Booking = require('../models/Booking');
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');

exports.bookTable = async (req, res) => {
  const { restaurantId, date, time, guests } = req.body;
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ msg: 'Restaurant not found' });

    if (restaurant.availableTables < guests) return res.status(400).json({ msg: 'Not enough tables available' });

    const booking = new Booking({ user: req.user._id, restaurant: restaurantId, date, time, guests });
    await booking.save();

    restaurant.availableTables -= guests;
    await restaurant.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('restaurant');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });

    if (booking.user.toString() !== req.user._id.toString()) return res.status(401).json({ msg: 'Unauthorized' });

    const restaurant = await Restaurant.findById(booking.restaurant);
    restaurant.availableTables += booking.guests;
    await restaurant.save();

    booking.status = 'cancelled';
    await booking.save();

    res.json({ msg: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};