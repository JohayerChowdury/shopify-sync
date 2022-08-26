//Purpose: Define routes for products resource, using controller methods

const express = require('express');
const router = express.Router({ mergeParams: true });
const StoreController = require('../controllers/StoreController');

const { authenticationJWT } = require('../middleware');

//GET all documents in MongoDB database
router.get('/', authenticationJWT, StoreController.getProducts);
// router.get('/count', authenticationJWT, StoreController.getProductsCount);

//GET specific product
router.get('/:productId', authenticationJWT, StoreController.getOneProduct);

//SYNC products
router.post('/', authenticationJWT, StoreController.sync);

module.exports = router;
