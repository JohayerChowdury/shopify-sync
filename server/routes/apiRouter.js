const express = require('express');
const apiRouter = express.Router();
// const storesRoute = require('./store_routes');
// apiRouter.use('/stores', storesRoute);
const app = express();

//users API
const userRoutes = require('./user_routes');
apiRouter.use('/users', userRoutes);

//stores API
const storesRoute = require('./store_routes');
apiRouter.use('/stores', storesRoute);

apiRouter.get('/', (req, res) => {
  res.render('index.ejs');
});

module.exports = apiRouter;
