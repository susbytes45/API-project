const fs = require('fs');
const Product = require('./../model/productmodel');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: 'sucess',
      // result: products.length,
      data: {
        results: products.length,
        products,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err,
    });
  }
};
const craeteProducts = async (req, res) => {
  try {
    const newproduct = await Product.create(req.body);
    return res
      .status(201)
      .json({ status: 'sucess', data: { product: newproduct } });
  } catch (err) {
    res.status(404).json({ status: 'fail', error: err });
  }
};
const getproduct = async (req, res) => {
  try {
    // console.log(req.params.id * 1);
    // console.log(req.requestname);
    const id = req.params.id;
    const newproduct = await Product.findById(id);
    // console.log(products);

    return res.status(200).json({ status: 'sucess', product: newproduct });
  } catch (err) {
    res.status(404).json({ status: 'fail', error: err });
  }
};
const deleteProducts = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.status(204).json({ status: 'sucess', data: null });
  } catch (err) {
    res.status(404).json({ status: 'fail', error: err });
  }
};
const updateProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).json({
      status: 'sucess',
      data: {
        product: product,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err });
  }
};

module.exports = {
  getAllProducts,
  getproduct,
  craeteProducts,
  deleteProducts,
  updateProducts,
};
