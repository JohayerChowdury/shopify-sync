//Purpose: Create a User controller that calls Mongoose functions and can be exported.

let UserModel = require('../models/User');
// let StoreModel = require('../models/Store');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//method for returning login/register API
//used for testing, can be commented out
// exports.users_index = (req, res) => {
//   res.render('users/index', {});
// };

exports.register = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password || !req.body.email) {
      return res.status(400).json({ msg: 'Please enter in all fields' });
    }
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(req.body.password, salt);
    const newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      full_name: req.body.full_name,
      password: hashedPassword,
    })
      .save(newUser)
      .then(() => res.redirect('/'))
      .catch((err) => res.status(400).json('Error: ' + err));
  } catch (err) {
    return res.status(500).send({ message: err.message || 'Error Occurred' });
  }
};

exports.login = async (req, res) => {
  try {
    //checks validity of entry
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ msg: 'Enter in any missing fields' });
    }
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ msg: "user doesn't exist" });
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (valid) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.json({
        token: token,
        user: {
          id: user._id,
          email: user.email,
        },
        msg: 'Successfully Logged in',
      });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message || 'Error Occurred' });
  }
};

exports.forget_password = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      username: req.body.username,
      email: req.body.email,
    });
    if (!user) {
      return res.status(400).json({ msg: "User doesn't exist" });
    }
    const salt = await bcrypt.genSalt(10);
    await bcrypt.hash(req.body.password, salt, function (req, hash) {
      var newValues = {
        username: user.username,
        email: user.email,
        password: hash,
      };
      UserModel.updateOne(user, newValues, function (err, res) {
        if (err) {
          console.log(err);
        }
      });
      user.save().then((user) => {
        res.json(user);
      });
    });
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error Occurred' });
  }
};

exports.getOne = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error Occurred' });
  }
};

exports.tokenIsValid = async (req, res) => {
  // this determines if the jwt token is valid or not (for authorization)
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      //if no token
      return res.status(401).send('No token found!');
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      //if this doesn't return with the object containing user ID
      return res.status(403).send('Not verified!');
    }
    const user = await User.findById(verified._id); // if user cannot be found based on id
    if (!user) {
      res.json('false, user not found');
    }
    res.json(true);
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error Occurred' });
  }
};
