const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getproduct,
  deleteProducts,
  craeteProducts,
  updateProducts,
  getProductStats,
} = require('./../controllers/productcontroller');
router.route('/top3expensiveproducts').get((req, res, next) => {
  req.query.sort = '-price';
  req.query.limit = 3;
  req.query.fields = 'name price type';
  next();
}, getAllProducts);
router.route('/productstats').get(getProductStats);
router.route('/').get(getAllProducts).post(craeteProducts);

router
  .route('/:id')
  .get(getproduct)
  .delete(deleteProducts)
  .patch(updateProducts);
module.exports = router;
// router.param('id', checkid);
