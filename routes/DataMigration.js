const express = require('express'); // simple packages
const router = express.Router();
const axios = require('axios').default;


const MongoClient  = require('mongodb').MongoClient;
const uri = "mongodb+srv://MathewShyftLabs:Tridelta1$@cluster0.brkzpsl.mongodb.net/?retryWrites=true&w=majority";
const server = require('mongodb').Server;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => { // connects to
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object

  
if(collection.countDocuments() == null || collection.countDocuments() == 0) { // this is to see if there are any instances in the collection

}




  client.close();
});
