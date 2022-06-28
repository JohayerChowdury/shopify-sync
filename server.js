//assigning port environment variable
const port = 5000 || process.env.PORT;

//installing express package
const express = require('express');
const app = express();
app.use(express.json());

//env file for security
require('dotenv').config();

//installing mongoose package
const mongoose = require('mongoose');

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

const db = mongoose.connection;

const shopifyRoute = require('./routes/Shopify');
app.use('/api/shopify', shopifyRoute);

app.get('/', function (req, res) {
  res.send('Backend homepage');
});

app.listen(5000, () => console.log(`Server started on port ${port}.`));
