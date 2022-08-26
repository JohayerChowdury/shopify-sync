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
    required: 'Please provide the ID of the owner',
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

storeSchema.pre('remove', function (next) {
  // Remove all the assignment docs that reference the removed person.
  this.model('Product').remove({ store: this._id }, next);
});

module.exports = mongoose.model('Store', storeSchema);
