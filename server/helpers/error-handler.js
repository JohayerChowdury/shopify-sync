module.exports = errorHandler;

function errorHandler(err, req, res, next) {
  if (typeof err === 'string') {
    //custom app error
    return res
      .status(400)
      .json({ message: err || 'Custom App Error from Handler' });
  }

  if (err.name === 'UnauthorizedError') {
    //jwt authentication error
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (err.name === 'ValidationError') {
    //mongoose validation error
    return res.status(400).json({
      message: err.message || 'Mongoose Validation Error from Handler',
    });
  }

  if (err.code === 11000) {
    return res
      .status(400)
      .json({
        message:
          err.message ||
          `There is already another store with name ${err.keyValue?.name} `,
      });
  }

  //default to 500 server error
  return res
    .status(500)
    .json({ message: err.message || '500 Server Error from Handler' });
}
