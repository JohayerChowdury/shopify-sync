//Purpose: Create a User controller that calls Mongoose functions and can be exported.

let UserModel = require('../models/User');
// let StoreModel = require('../models/Store');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  // frontend takes care of following error handling
  //   if (!req.body.username || !req.body.password || !req.body.email) {
  //     return res.status(400).json({ msg: 'Please enter in all fields' });
  //   }
  //   const user = await UserModel.findOne({ email: req.body.email });
  //   if (user) {
  //     return res.status(400).json({ msg: 'User already exists' });
  //   }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        full_name: req.body.full_name,
        password: hash,
      });
      newUser
        .save()
        .then((user) =>
          res.status(200).send({
            user: {
              _id: user._id,
              email: user.email,
            },
            message: 'User was registered succesfully!',
          })
        )
        .catch((err) => res.status(400).json('Error: ' + err));
    });
  });
};

exports.login = async (req, res) => {
  try {
    //checks validity of entry
    // frontend takes care of following error handling
    // if (!req.body.email || !req.body.password) {
    //   return res.status(400).json({ msg: 'Enter in any missing fields' });
    // }
    const user = await UserModel.findOne({ email: req.body.email }).populate(
      'stores'
    );
    if (!user) {
      return res.status(400).json({ message: "user doesn't exist" });
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    //needs error handled for incorrect email/password
    if (valid) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.status(200).send({
        token: token,
        user: {
          _id: user._id,
          email: user.email,
        },
        message: 'Successfully Logged in',
      });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message || 'Error Occurred' });
  }
};

// can update in the future for user verification (anyone can access a user's forget password)
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
        res.status(200).send(user);
      });
    });
  } catch (err) {
    return res.status(500).send({ message: err.message || 'Error Occurred' });
  }
};

exports.getOne = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    res.status(200).send({
      _id: user._id,
      username: user.username,
      email: user.email,
      full_name: user.full_name,
    });
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error Occurred' });
  }
};

// exports.tokenIsValid = async (req, res) => {
//   // this determines if the jwt token is valid or not (for authorization)
//   try {
//     // const authHeader = req.headers['authorization'];
//     const authHeader =
//       req.headers.authorization &&
//       req.headers.authorization.startsWith('Bearer');
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token == null) {
//       //if no token
//       return res.status(401).send('No token found!');
//     }
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     if (!verified) {
//       //if this doesn't return with the object containing user ID
//       return res.status(403).send('Not verified!');
//     }
//     const user = await User.findById(verified._id); // if user cannot be found based on id
//     if (!user) {
//       res.json('false, user not found');
//     }
//     res.json(true);
//   } catch (err) {
//     return res.status(500).send({ message: err.message || 'Error Occurred' });
//   }
// };
