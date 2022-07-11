const express = require('express');
const apiRouter = express.Router();
// const storesRoute = require('./store_routes');
// apiRouter.use('/stores', storesRoute);
const app = express();

const userRoutes = require('./Users');
apiRouter.use("/users", userRoutes);

apiRouter.get("/", (req,res) => {
    res.render('index.ejs')
})






//stores API
const storesRoute = require('./store_routes');
apiRouter.use('/stores', storesRoute);


module.exports = apiRouter;

