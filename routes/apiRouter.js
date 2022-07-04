const express = require('express');
const apiRouter = express.Router();

//stores API
const storesRoute = require('./store_routes');
apiRouter.use('/stores', storesRoute);

module.exports = apiRouter;
