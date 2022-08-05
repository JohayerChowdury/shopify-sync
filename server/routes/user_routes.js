//Purpose: Define express routes for users.
const userRouter = require('express').Router({ mergeParams: true });
const UserController = require('../controllers/UserController');
const { verifyRegisterDupes, authenticationJWT } = require('../middleware');

userRouter.post('/register', verifyRegisterDupes, UserController.register);

userRouter.post('/login', UserController.login);

userRouter.post('/forgot_password', UserController.forget_password);

<<<<<<< HEAD
userRouter.get('/profile', authenticationJWT, UserController.getOne);
=======
userRouter.get('/profile',  UserController.getOne);
>>>>>>> 261194c7aaff039bc3bb1d6689ee1383144025c4

// userRouter.post('/tokenIsValid', UserController.tokenIsValid);

module.exports = userRouter;
