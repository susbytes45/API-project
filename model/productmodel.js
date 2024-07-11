const mongoose = require('mongoose');
const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a product must have name '],
    unique: true,
  },
  saleDuration: {
    type: Number,
    required: [true, 'a tour must have duration'],
  },
  type: {
    type: String,
    required: [true, 'a product must have a type'],
  },
  ratingsAverage: {
    type: Number,
    default: 4,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    min: 500,
    max: 100000,
    default: 1000,
  },
  priceDiscount: { type: Number },
  summary: {
    type: String,
    trim: true,
  },
  description: { type: String, trim: true },
  imageCover: {
    type: String,
    required: [true, 'a priduct must have a image for card'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  ratings: {
    type: Number,
    default: 3.5,
    min: 0,
    max: [5, 'a ratings must be less and qual to 5'],
  },
});
const Product = new mongoose.model('Product', productsSchema);
module.exports = Product;
