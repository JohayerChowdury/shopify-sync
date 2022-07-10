//assigning port environment variable
const port = 5000 || process.env.PORT;

//installing express package
const express = require('express');

//env file for security
require('dotenv').config();

//installing and using method-override package to integrate PUT & DELETE requests for HTML forms
const methodOverride = require('method-override');

//installing mongoose package
const mongoose = require('mongoose');

//connecting to mongoDB database using DB_URI parameter
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connection is successful.');
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //assiging view to engine to ejs
    app.set('view engine', 'ejs');

    app.use(methodOverride('_method'));

    //homepage
    app.get('/', (req, res) => {
      res.render('index');
    });

    //API routing
    const apiRouter = require('./routes/apiRouter');
    app.use('/shopify_api', apiRouter);

    //listening on port
    app.listen(port, () => console.log(`Server started on port ${port}.`));
  });