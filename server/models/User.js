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
  // token: {
  //     type: String,
  // },
  required: ['email', 'password'],
});
module.exports = mongoose.model('User', UserSchema);
