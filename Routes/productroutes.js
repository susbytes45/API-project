const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getproduct,
  deleteProducts,
  craeteProducts,
  updateProducts,
} = require('./../controllers/productcontroller');
router.route('/').get(getAllProducts).post(craeteProducts);

router
  .route('/:id')
  .get(getproduct)
  .delete(deleteProducts)
  .patch(updateProducts);
module.exports = router;
// router.param('id', checkid);
