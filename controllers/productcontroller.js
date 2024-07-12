const fs = require('fs');
const Product = require('./../model/productmodel');
const APIfeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../appError');
const getProductStats = catchAsync(async (req, res, next) => {
  const stats = await Product.aggregate([
    { $match: { price: { $gt: 1000 } } },
    {
      $group: {
        _id: '$type',
        noofproducts: { $sum: 1 },
        avgRating: { $avg: '$ratingsAverage' },
        numofratings: { $sum: '$ratingsQuantity' },
        avgPrice: { $avg: '$price' },
        minprice: { $min: '$price' },
        maxprice: { $max: '$price' },
      },
    },
    {
      $sort: { avgRating: -1 },
    },
    {
      $match: { _id: { $ne: 'basic' } },
    },
    {
      $project: { _id: 1, noofproducts: 1, avgRating: 1 },
    },
  ]);
  // console.log('run', stats);
  // console.log(stats);
  res.status(200).json({
    stats: stats,
  });
});
const getAllProducts = catchAsync(async (req, res, next) => {
  // query conversion to products
  // console.log(x);
  const features = new APIfeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;
  // throw new Error('from product handler');
  res.status(200).json({
    status: 'sucess',
    // result: products.length,
    data: {
      results: products.length,
      products,
    },
  });
});
const craeteProducts = catchAsync(async (req, res, next) => {
  const newproduct = await Product.create(req.body);
  return res
    .status(201)
    .json({ status: 'sucess', data: { product: newproduct } });
  next();
});
const getproduct = catchAsync(async (req, res, next) => {
  // console.log(req.params.id * 1);
  // console.log(req.requestname);
  const id = req.params.id;
  const newproduct = await Product.findById(id);
  if (!newproduct) {
    let err = new AppError('invalid id please use a valid id', 404);
    return next(err);
  }
  // console.log(products);

  return res.status(200).json({ status: 'sucess', product: newproduct });
});
const deleteProducts = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    let err = new AppError('invalid id please use a valid id', 404);
    return next(err);
  }
  res.status(204).json({ status: 'sucess', data: null });
});
const updateProducts = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  console.log(req.body);

  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!product) {
    let err = new AppError('invalid id please use a valid id', 404);
    return next(err);
  }

  res.status(200).json({
    status: 'sucess',
    data: {
      product: product,
    },
  });
});

module.exports = {
  getAllProducts,
  getproduct,
  craeteProducts,
  deleteProducts,
  getProductStats,
  updateProducts,
};
