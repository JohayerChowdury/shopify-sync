//Purpose: Create a controller that calls Mongoose functions and can be exported.

let StoreModel = require('../models/Store');

function saveStore() {
  return async (req, res) => {
    let store = req.store;
    if (!req.body.storeId) {
      res.status(400).send({ message: 'storeId cannot be empty!' });
    } else {
      store.storeId = req.body.storeId;
    }
    if (!req.body.url) {
      res.status(400).send({ message: 'url cannot be empty!' });
    } else {
      store.url = req.body.url;
    }
    if (!req.body.access_token) {
      res.status(400).send({ message: 'access token cannot be empty!' });
    } else {
      store.access_token = req.body.access_token;
    }
    if (!req.body.name) {
      res.status(400).send({ message: 'name cannot be empty!' });
    } else {
      store.name = req.body.name;
    }
    store.address = req.body.address;
    try {
      store = await store.save();
      res.send(store);
    } catch (err) {
      res.status(500).send({ message: err.message || 'Error Occurred' });
    }
  };
}

exports.getAll = async (req, res) => {
  try {
    const stores = await StoreModel.find().sort({ name: 'asc' }).exec();
    res.send(stores);
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error Occurred' });
  }
};

exports.getOne = async (req, res, next) => {
  let storeId = req.params.storeId;
  try {
    const store = await StoreModel.findOne({ storeId: storeId }).exec();
    if (store == null) {
      res.status(404).send({ message: 'No store found with id: ' + storeId });
    } else {
      res.send(store);
    }
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error Occurred' });
  }
};

exports.add = () => {
  async (req, res, next) => {
    req.store = new StoreModel();
    next();
  },
    saveStore();
};

exports.update = () => {
  async (req, res, next) => {
    req.store = await StoreModel.findOne({
      storeId: req.params.storeId,
    }).exec();
    next();
  },
    saveStore();
};

exports.delete = async (req, res) => {
  let storeId = req.params.storeId;
  try {
    await StoreModel.findOneAndDelete({ storeId: storeId });
    res.send({ message: 'Store was deleted successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error Occurred' });
  }
};
