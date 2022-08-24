const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  full_name: {
    type: String,
  },
  password: {
    type: String, // encrypted type instead of String
  },
  email: {
    type: String,
    index: { unique: true },
  },
  stores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
    },
  ],
  required: ['email', 'password'],
});

UserSchema.pre('remove', function (next) {
  // Remove all the assignment docs that reference the removed person.
  this.model('Store').remove({ owner: this._id });
  next();
});
module.exports = mongoose.model('User', UserSchema);
