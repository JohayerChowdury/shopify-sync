//Purpose: Create a User controller that calls Mongoose functions and can be exported.

let UserModel = require('../models/User');
// let StoreModel = require('../models/Store');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const AWS = require('aws-sdk');
// const ses = new AWS.SES({
//   senderEmail: 'test@shyftlabs.io',
//   region: 'ca-central-1',
//   accessKeyId: 'AKIA3B6GPOCT4YNNP3OB',
//   secretAccessKey: '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',
// });
const { v4: uuidv1 } = require('uuid');
// var validate = require('uuid-validate');
const redis = require('redis');
const client = redis.createClient();

client.on('connect', function () {
  console.log('Connected to redis server!');
});
client.connect();

exports.register = async (req, res) => {
  // if (!req.body.username || !req.body.password || !req.body.email) {
  //   return res.status(400).json({ msg: 'Please enter in all fields' });
  // }
  const user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(400)
      .json({ msg: 'User already exists with email given' });
  }
  //const salt = await bcrypt.genSalt(10);
  //const hashedPassword = await bcrypt.hash(req.body.password, salt);
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        full_name: req.body.full_name,
        password: hash,
      });
      // .save(newUser)
      // .then(() => res.redirect('/'))
      // .catch((err) => res.status(400).json('Error: ' + err));
      newUser
        .save()
        .then((user) =>
          res.json({
            // token: jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET),
            user: {
              _id: newUser._id,
              email: newUser.email,
              username: newUser.username,
              full_name: newUser.full_name,
            },
          })
        )
        .catch((err) => res.status(400).json('Error: ' + err));
    });
  });
};

exports.login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }).populate(
      'stores'
    );
    if (!user) {
      return res.status(400).json({ message: "user doesn't exist" });
    }

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (valid) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.status(200).send({
        token: token,
        user: {
          _id: user._id,
          email: user.email,
          username: user.username,
          full_name: user.full_name,
        },
        message: 'Successfully Logged in',
      });
    } else {
      return res.status(400).send({ message: err.message || 'Error Occurred' });
    }
  } catch (err) {
    return res.status(400).send({ message: err.message || 'Error Occurred' });
  }
};
exports.change_password = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(400).json({
        msg: "User Doesn't Exist.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    await bcrypt.hash(req.body.password, salt, function (req, hash) {
      var newValues = {
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

// can update in the future for user verification (anyone can access a user's forget password)
exports.forget_password = async (req, res) => {
  var check = await client.get('uuid');
  console.log(check);
  if (check != req.body.link) {
    return res
      .status(400)
      .json({ msg: 'The link you used is invalid, please try again' });
  }

  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(400).json({
        msg: 'User doesnt exist.',
      });
    }
    const salt = await bcrypt.genSalt(10);
    await bcrypt.hash(req.body.password, salt, function (req, hash) {
      var newValues = {
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

exports.verify_user = async (req, res) => {
  try {
    let user = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(400).json({ msg: "User Doesn't exist" });
    }
    let code = uuidv1();
    await client.set('uuid', code, function (err, reply) {
      console.log(reply);
    });
    console.log(await client.get('uuid'));

    // var params = {
    //   Source: 'test@shyftlabs.io',
    //   Destination: {
    //     ToAddresses: [req.body.email],
    //   },
    //   Message: {
    //     Body: {
    //       Html: {
    //         Charset: 'UTF-8',
    //         Data: `<p><b>Hello,</b></p>
    //         <p>Here is the link to reset your password: ${process.env.EMAIL_WEB_URI}${code}</p> </br>
    //       },
    //     },
    //     Subject: {
    //       Charset: 'UTF-8',
    //       Data: 'Password Reset Link',
    //     },
    //   },
    // };
    // ses
    //   .sendEmail(params)
    //   .promise()
    //   .then((res) => {
    //     console.log(res);
    //   });
  } catch (err) {
    console.log(err);
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
