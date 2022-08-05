//Purpose: Define express routes for users.
const userRouter = require('express').Router({ mergeParams: true });
const UserController = require('../controllers/UserController');
const { verifyRegisterDupes, authenticationJWT } = require('../middleware');

userRouter.post('/register', verifyRegisterDupes, UserController.register);

userRouter.post('/login', UserController.login);

userRouter.post('/forgot_password', UserController.forget_password);

userRouter.get('/profile', authenticationJWT, UserController.getOne);

// userRouter.post('/tokenIsValid', UserController.tokenIsValid);

module.exports = userRouter;
