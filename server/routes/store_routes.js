//Purpose: Define routes for stores resource, using controller methods

const express = require('express');
const storeRouter = express.Router({ mergeParams: true });
let StoreModel = require('../models/Store');
const StoreController = require('../controllers/StoreController');

//FOR EJS VIEW: stores/index
// storeRouter.get('/', async (req, res) => {
//   const stores = await StoreModel.find().sort({ name: 'asc' }).exec();
//   res.render('stores/index', { stores: stores });
// });

storeRouter.get('/', StoreController.getAll);

storeRouter.post('/', StoreController.add);

//FOR EJS VIEW: stores/add
// storeRouter.get('/add', (req, res) => {
//   res.render('stores/add', { store: new StoreModel() });
// });

//FOR EJS VIEW: stores/edit
// storeRouter.get('/edit/:storeId', async (req, res) => {
//   let storeId = req.params.storeId;
//   const store = await StoreModel.findOne({ storeId: storeId }).exec();
//   //   console.log('Editing store: ' + store);
//   res.render('stores/edit', { store: store });
// });

//products API
//referenced https://medium.com/@zachcaceres/child-routers-in-express-56f904597b1b to use child routers
const productsRoute = require('./product_routes');
storeRouter.use(
  '/:storeId/products',
  (req, res, next) => {
    req.storeId = req.params.storeId;
    next();
  },
  productsRoute
);

storeRouter
  .route('/:storeId')
  //FOR EJS VIEW: stores/show
  // .get(async (req, res, next) => {
  //   let storeId = req.params.storeId;
  //   const store = await StoreModel.findOne({ storeId: storeId }).exec();
  //   // console.log('Found store: ' + store);
  //   if (store == null) {
  //     res.redirect('/');
  //   }
  //   res.render('stores/show', { store: store });
  // })
  .get(StoreController.getOne)
  .put(StoreController.update)
  .delete(StoreController.delete);

module.exports = storeRouter;
