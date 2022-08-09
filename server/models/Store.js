const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
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
    index: { unique: true },
  },
  address: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'Please provide the email of the owner',
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

module.exports = mongoose.model('Store', storeSchema);
