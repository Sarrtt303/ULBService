// models/Listing.js
const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  price: { type: Number, required: true },
  images: [String],
  amenities: [String],
  propertyType: {
    type: String,
    enum: ['apartment', 'house', 'condo', 'villa']
  },
  bedrooms: Number,
  bathrooms: Number,
  maxGuests: { type: Number, required: true },
  availableFrom: Date,
  availableTo: Date,
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);
