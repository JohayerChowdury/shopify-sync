const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const mongoose = require('mongoose');

  //fields:
  let product_ids = [];
  let product_title = [];
  let body_html = [];
  let vendor = [];
  let product_type = [];
  let created_at = [];
  let handle = [];
  let updated_at = [];
  let published_at = [];
  let template_suffix = [];
  let status = [];
  let published_scope = [];
  let tags = [];
  let admin_graphq_api_id = [];


axios
    .get('https://test-store-ap.myshopify.com/admin/api/2022-04/products.json' , { // uses the retrieve list of products
        headers: {
            'X-Shopify-Access-Token' : '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' // required to access our instance
        }
    })
    .then(res => {
        console.log('statusCode : ' + res.status); // sends back status to see if worked or not
        



        for(let i = 0 ; i < res.data.products.length; i++){ // populate arrays
            product_ids[i] = res.data.products[i].product_ids;
            product_title[i] = res.data.products[i].product_title;
            body_html[i] = res.data.products[i].body_html;
            vendor[i] = res.data.products[i].vendor;
            product_type[i] = res.data.products[i].product_type;
            created_at[i] = res.data.products[i].created_at;
            handle[i] = res.data.products[i].handle;
            updated_at[i] = res.data.products[i].updated_at;
            published_at[i] = res.data.products[i].published_at;
            template_suffix[i] = res.data.products[i].template_suffix;
            status[i] = res.data.products[i].status;
            published_scope[i] = res.data.products[i].published_scope;
            tags[i] = res.data.products[i].tags;
            admin_graphq_api_id[i] = res.data.products[i].admin_graphq_api_id;
            for(let j = 0 ; j < res.data.products.length; j++) {


            }
        }
    })
    .catch(error => {    // incase of error
        console.error(error)
    });

    //now for connecting
    const { MongoClient, ServerApiVersion } = require('mongoose');
    const uri = "mongodb+srv://MathewShyftLabs:Mcmaster1$@cluster0.brkzpsl.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true , serverApi: ServerApiVersion.v1 });
    client.connect(err => { // connects to
      const collection = client.db("Products").collection("products");

      if(collection.countDocuments() == 0 || collection.countDocuments() == null){ // see if there are any documents in the collection
        console.log("yes it is empty")
        for(let i = 0 ; i < product_ids.length ; i++){ // populate database
            collection.insertOne(
                {
                    _id: product_ids[i],
                    product_title: product_title[i],
                    body_html: body_html[i],
                    vendor: vendor[i],
                    product_type: producty_type[i],
                    created_at:created_at[i],
                    handle:handle[i],
                    updated_at:updated_at[i],
                    published_at:published_at[i],
                    template_suffix:template_suffix[i],
                    statue:status[i],
                    published_scope:published_scope[i],
                    tags:tags[i],
                    admin_graphq_api_id:admin_graphq_api_id[i]



                }
            );

        }
       
      }

    
    
      
    
    
    
      client.close();
    });




module.exports = router;    