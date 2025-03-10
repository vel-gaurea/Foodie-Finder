const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  cuisines: [{ type: String }],
  images: [{ type: String }],
  tables: { type: Number, required: true },
  availableTables: { type: Number, required: true },
  schedule: {
    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true }
  }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);