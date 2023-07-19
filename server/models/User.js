const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: `Please provide the username.`,
  },
  full_name: {
    type: String,
    required: `Please provide the user's full name.`,
  },
  password: {
    type: String, // encrypted type instead of String
    required: `Please provide the user's password.`,
  },
  email: {
    type: String,
    index: { unique: true },
    required: `Please provide the user's email.`,
  },
  // profilePicture: {
  //   type: String
  // },
  stores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
    },
  ],
});

UserSchema.pre('remove', function (next) {
  // Remove all the assignment docs that reference the removed person.
  this.model('Store').remove({ owner: this._id });
  next();
});
module.exports = mongoose.model('User', UserSchema);
