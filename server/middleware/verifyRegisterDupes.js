//Purpose: Check duplications for username and email.
//inspired by: https://www.bezkoder.com/node-js-mongodb-auth-jwt/

let UserModel = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    // Username
    UserModel.findOne({
      username: req.body.username,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err.message });
        return;
      }
      if (user) {
        res
          .status(400)
          .send({ message: 'Failed! Username is already in use!' });
        return;
      }

      // Email
      UserModel.findOne({
        email: req.body.email,
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err.message });
          return;
        }
        if (user) {
          res.status(400).send({ message: 'Failed! Email is already in use!' });
          return;
        }
        next();
      });
    });
  } catch (err) {
    return res.status(500).send({ message: err.message || 'Error Occurred' });
  }
};
