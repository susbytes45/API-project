const mongoose = require('mongoose');
const slugify = require('slugify');
const productsSchema = new mongoose.Schema(
  {
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
      enum: {
        values: ['premium', 'standard', 'Basic', 'basic'],
        mesage: 'Type must be premium standard and basic',
      },
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
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'price discount must be less than price',
      },
    },
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
      select: false,
      type: Date,
      default: Date.now(),
    },
    ratings: {
      type: Number,
      default: 3.5,
      min: 0,
      max: [5, 'a ratings must be less and qual to 5'],
    },
    slug: String,
    secretProduct: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
productsSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
productsSchema.pre('save', function (next) {
  // console.log('....will save the document');
  next();
});

productsSchema.post('save', function (doc, next) {
  // console.log(doc);
  next();
});
productsSchema.pre(/^find/, function (next) {
  // console.log('from query middleware ');
  this.find({ secretProduct: { $ne: true } });
  next();
});
productsSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretProduct: { $ne: true } } });
  next();
});
productsSchema.virtual('PriceinUSD').get(function () {
  return this.price / 83;
});
const Product = new mongoose.model('Product', productsSchema);
module.exports = Product;
