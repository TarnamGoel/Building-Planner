const mongoose = require('mongoose');

const DrawingSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  }
}, { timestamps: true }); // This adds createdAt field

module.exports = mongoose.model('Drawing', DrawingSchema);
