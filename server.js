const express  = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose.connect('monogodb//localhost/ourdbname' ,{ useNewUrlParser:true});
const db = mongoose.connect;
db.on('error', (error) => console.error(error));
db.once('open' , () => console.log('Connected to Database'));


app.use(express.json());
const sourcesRoute = require('./routes/sources');
app.use('/sources', sourcesRoute);



app.listen(5000, () => console.log('server has started'));