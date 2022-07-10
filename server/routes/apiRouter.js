const express = require('express');
const apiRouter = express.Router({ mergeParams: true });

//stores API
const storesRoute = require('./store_routes');
apiRouter.use('/stores', storesRoute);

module.exports = apiRouter;
