const userRouter = require('express').Router({ mergeParams: true });
const UserController = require('../controllers/UserController');

const auth = require('../middleware/authorization');

// userRouter.get('/', UserController.getAll);

// userRouter.get('/register', (req, res) => {
//   // this finds a list of all the users already registered
//   // User.find()
//   // .then((users) => res.json(users))
//   // .catch((err) => res.status(400).json("Error: " + err));
//   res.render('users/register');
// });

//register route
userRouter.post('/register', UserController.register);

//login functions

// userRouter.get('/login', async (req, res) => {
//   res.render('users/login');
// });

userRouter.post('/login', UserController.login);

// userRouter.get('/forgot_password', async (req, res) => {
//   res.render('users/forgotPassword');
// });

userRouter.post('/forgot_password', UserController.forget_password);

userRouter.get('/profile', auth, UserController.getOne);

userRouter.post('/tokenIsValid', UserController.tokenIsValid);

module.exports = userRouter;
