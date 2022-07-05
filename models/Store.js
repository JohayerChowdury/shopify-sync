const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: 'Please an enter an ID for this store to access in this app.',
    index: { unique: true },
  },
  url: {
    type: String,
    required: 'Please provide the URL for accessing this store.',
  },
  access_token: {
    type: String,
    required: 'Please provide the access token for accessing this store.',
  },
  name: {
    type: String,
    required: 'Please enter a name for the store.',
  },
  address: {
    type: String,
  },
});

storeSchema.query.byStoreId = function (storeId) {
  return this.where({ storeId: storeId });
};

module.exports = mongoose.model('Store', storeSchema);
