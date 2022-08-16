const express = require('express');

const router = express.Router({ mergeParams: true });
const axios = require('axios').default;
let StoreModel = require('../models/Store');
let ProductModel = require('../models/Product');
const StoreController = require('../controllers/StoreController');

//GET all documents in MongoDB database
router.get('/', StoreController.getProducts);

//GET specific product
router.get('/:productId', StoreController.getOneProduct);



router.post('/', StoreController.sync);

module.exports = router;
