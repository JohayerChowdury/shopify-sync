//assigning port environment variable
const port = 5000 || process.env.PORT;

//installing express package
const express = require('express');
const app = express();
app.use(express.json());

//assiging view to engine to ejs
app.set('view engine', 'ejs');

//env file for security
require('dotenv').config();

//installing and using method-override package to integrate PUT & DELETE requests for HTML forms
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//installing mongoose package
const mongoose = require('mongoose');

//connecting to mongoDB database using DB_URI parameter
mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Mongo DB Connection is successful.');
    }
  }
);

//API routing
const apiRouter = require('./routes/apiRouter');
app.use('/shopify_api', apiRouter);

//homepage
app.get('/', (req, res) => {
  res.render('index');
});

//listening on port
app.listen(5000, () => console.log(`Server started on port ${port}.`));
