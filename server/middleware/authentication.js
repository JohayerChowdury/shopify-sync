//this file is for giving user access to protected routes

const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  // this determines if the jwt token is valid or not (for authorization)
  try {
    const token =
      req.headers['x-access-token'] ||
      req.headers.authorization ||
      req.body.token;
    if (token == null) {
      //if no token
      return res.status(403).send('No token found!');
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      //if this doesn't return with the object containing user ID
      return res.status(401).send('Unauthorized!');
    }
    req.userId = verified._id;
    // console.log('Req.userId in authentication middleware is: ' + req.userId);
    next();
  } catch (err) {
    return res.status(500).send({ message: err.message || 'Error Occurred' });
  }
};
