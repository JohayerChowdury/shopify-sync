//Purpose: Create a User controller that calls Mongoose functions and can be exported.

let UserModel = require('../models/User');
let StoreModel = require('../models/Store');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//method for returning login/register API
//used for testing, can be commented
// exports.users_index = (req, res) => {
//   res.render('users/index', {});
// };

exports.register = async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.redirect('/register');
    return res.status(400).json({ msg: 'Please enter in all fields' });
  }
  const user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  bcrypt.genSalt(10, function (salt) {
    bcrypt.hash(req.body.password, salt, function (hash) {
      const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
      newUser
        .save()
        .then(() => res.redirect('/'))
        .catch((err) => res.status(400).json('Error: ' + err));
    });
  });
};

exports.login = async (req, res) => {
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
    // res.redirect("/");
  } else {
    return res.status(400).json({ msg: 'Authentication Error' });
  }
};

exports.forget_password = async (req, res) => {
  const user = await UserModel.findOne({
    username: req.body.username,
    email: req.body.email,
  });
  if (!user) {
    return res.status(400).json({ msg: "User doesn't exist" });
  }

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (req, hash) {
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
  });
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
    res.status(500).json({ msg: err.message });
  }
};

exports.tokenIsValid = async (req, res) => {
  // this determines if the jwt token is valid or not (for authorization)
  try {
    const token = req.header('auth-token');
    if (!token) {
      //if no token
      return res.json('false');
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      //if this doesn't return with the object containing user ID
      return res.json('false');
    }
    const user = await User.findById(verifid._id); // if user cannot be found baed on id
    if (!user) {
      return res.json('false');
    }
    return res.json(true);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
