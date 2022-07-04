const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: true,
    index: { unique: true },
  },
  url: {
    type: String,
    required: true,
  },
  access_token: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
});

storeSchema.query.byStoreId = (store_id) => {
  return this.where({ store_id: store_id });
};

module.exports = mongoose.model('Store', storeSchema);
