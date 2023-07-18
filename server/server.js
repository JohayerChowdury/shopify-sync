//assigning port environment variable
const port = 5000 || process.env.PORT;

//installing express package
const express = require('express');

//env file for security
require('dotenv').config();

//installing and using method-override package to integrate PUT & DELETE requests for HTML forms
const methodOverride = require('method-override');

//installing mongoose package to write MongoDB models
const mongoose = require('mongoose');

//installing cors package to enable CORS
var cors = require('cors');

// add in future
// const globalErrorHandler = require('./helpers/error-handler');

//connecting to mongoDB database using DB_URI parameter
mongoose
  //use DB_URI in .env file
  .connect(process.env.DB_URI, {
    //these headers are required
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connection is successful.');

    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(
      cors({
        origin: 'http://localhost:3000',
      })
    );

    app.use(methodOverride('_method'));

    app.use((req, res, next) => {
      res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
      );
      next();
    });

    // app.use(globalErrorHandler);

    //homepage
    app.get('/', (req, res) => {});

    //API routing
    const apiRouter = require('./routes/apiRouter');
    app.use('/shopify_api', apiRouter);

    //listening on port
    app.listen(port, () => console.log(`Server started on port ${port}.`));
  });
