const express = require('express');
const router = express.Router();
const axios = require('axios').default;

axios
    .get('https://test-store-ap.myshopify.com/admin/api/2022-04/products.json' , { // uses the retrieve list of products
        headers: {
            'X-Shopify-Access-Token' : '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' // required to access our instance
        }
    })
    .then(res => {
        console.log('statusCode : ' + res.status); // sends back status to see if worked or not
        const products_list = []; // 2 arrays: one for all of the fields and one for just last upated
        const updated_at_list =[];
        for(let i = 0 ; i < res.data.products.length; i++){ // populate arrays
            products_list[i] = res.data.products[i];
            updated_at_list[i] = res.data.products[i].updated_at;
            console.log(res.data.products[i].updated_at) // for testing


        }
    })
    .catch(error => {    // incase of error
        console.error(error)
    });





module.exports = router;    