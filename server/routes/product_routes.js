const express = require('express');
// const app = express();
// app.use(express.json());
const router = express.Router({ mergeParams: true });
const axios = require('axios').default;
let StoreModel = require('../models/Store');
let ProductModel = require('../models/Product');
const StoreController = require('../controllers/StoreController');

//GET all documents in MongoDB database
router.get('/', StoreController.getProducts);

//GET specific product
router.get('/:productId', StoreController.getOneProduct);

//EJS VIEW for products/show
// router.get('/:product_id', async (req, res) => {
//   let storeId = req.params.storeId;
//   const store = await StoreModel.findOne({ storeId: storeId }).exec();
//   const product = await ProductModel.findOne({
//     storeId: storeId,
//     product_id: req.params.product_id,
//   }).exec();
//   res.render('products/show', { store: store, product: product });
// });

router.post('/', StoreController.sync);

module.exports = router;
