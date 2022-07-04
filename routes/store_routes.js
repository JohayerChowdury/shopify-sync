const express = require('express');
const Store = require('../models/Store');
const app = express();
app.use(express.json());
const storeRouter = express.Router();
let StoreModel = require('../models/Store');

storeRouter.get('/', async (req, res) => {
  const stores = await StoreModel.find().sort({ name: 'asc' });
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

storeRouter.get('/edit/:id', async (req, res) => {
  res.render('stores/edit', { store: store });
});

storeRouter
  .route('/:storeId')
  .get(async (req, res) => {
    const store = await StoreModel.find().byStoreId(
      req.params.storeId,
      (err, documents) => {
        if (err) {
          console.log('Something went wrong with finding documents');
        } else {
          return documents;
        }
      }
    );
    if (store == null) {
      res.redirect('/');
    }
    res.render('stores/show', { store: store });
  })
  .put(async (req, res, next) => {
    req.store = await StoreModel.find().byStoreId(req.params.storeId);
    next();
  }, saveStoreAndRedirect('edit'))
  .delete(async (req, res) => {
    await StoreModel.findOneAndDelete(
      { storeId: req.params.storeId },
      (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Deleted store: ', docs);
        }
      }
    );
  }, saveStoreAndRedirect('new'));

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
      res.redirect(`stores/${store.storeId}`);
    } catch (err) {
      res.render(`stores/${path}`, { store: store });
    }
  };
}

module.exports = storeRouter;
