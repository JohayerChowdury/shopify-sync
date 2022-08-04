const userRouter = require('express').Router({ mergeParams: true });
const UserController = require('../controllers/UserController');

const auth = require('../middleware/authentication');

// userRouter.get('/register', (req, res) => {
//   // this finds a list of all the users already registered
//   // User.find()
//   // .then((users) => res.json(users))
//   // .catch((err) => res.status(400).json("Error: " + err));
//   res.render('users/register');
// });

userRouter.post('/register', UserController.register);

userRouter.post('/login', UserController.login);

userRouter.post('/forgot_password', UserController.forget_password);

userRouter.get('/profile',  UserController.getOne);

userRouter.post('/tokenIsValid', UserController.tokenIsValid);

module.exports = userRouter;
