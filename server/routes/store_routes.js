const express = require('express');
const storeRouter = express.Router({ mergeParams: true });
let StoreModel = require('../models/Store');

storeRouter.get('/', async (req, res) => {
  const stores = await StoreModel.find().sort({ name: 'asc' }).exec();
  res.render('stores/index', { stores: stores });
});

storeRouter.post(
  '/',
  async (req, res, next) => {
    req.store = new StoreModel();
    next();
  },
  saveStoreAndRedirect('add')
);

storeRouter.get('/add', (req, res) => {
  res.render('stores/add', { store: new StoreModel() });
});

storeRouter.get('/edit/:storeId', async (req, res) => {
  let storeId = req.params.storeId;
  const store = await StoreModel.findOne({ storeId: storeId }).exec();
  //   console.log('Editing store: ' + store);
  res.render('stores/edit', { store: store });
});

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
  .get(async (req, res, next) => {
    let storeId = req.params.storeId;
    const store = await StoreModel.findOne({ storeId: storeId }).exec();
    // console.log('Found store: ' + store);
    if (store == null) {
      res.redirect('../stores');
    }
    res.render('stores/show', { store: store });
  })
  .put(async (req, res, next) => {
    req.store = await StoreModel.findOne({
      storeId: req.params.storeId,
    }).exec();
    next();
  }, saveStoreAndRedirect('edit'))
  .delete(async (req, res) => {
    let storeId = req.params.storeId;
    // console.dir(storeId);
    await StoreModel.findOneAndDelete({ storeId: storeId });
    res.redirect('../stores');
  });

function saveStoreAndRedirect(path) {
  return async (req, res) => {
    let store = req.store;
    store.storeId = req.body.storeId;
    store.url = req.body.url;
    store.access_token = req.body.access_token;
    store.name = req.body.name;
    store.address = req.body.address;
    try {
      store = await store.save();
      //   if (path === 'add') {
      //     res.json('New store added');
      //   } else if (path === 'edit') {
      //     res.json('Store is updated');
      //   }
      res.redirect(`/shopify_api/stores/${store.storeId}`);
    } catch (err) {
      res.status(500).send({ message: err.message } || 'Error Occurred');
      // res.render(`stores/${path}`, { store: store });
    }
  };
}

module.exports = storeRouter;
