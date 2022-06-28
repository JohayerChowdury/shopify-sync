const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();
const axios = require('axios').default;
let ProductModel = require('../models/Product');

//GET all documents in MongoDB database
router.get('/', (req, res) => {
  ProductModel.find({}, function (err, documents) {
    if (err) {
      res.send('Something went wrong with finding ALL documents');
    } else {
      res.send(documents);
    }
  });
});

//POST all documents from Shopify API into MongoDB database
router.post('/', (req, res) => {
  axios
    .get(
      'https://test-store-ap.myshopify.com/admin/api/2022-04/products.json',
      {
        // GET 'list of products'
        headers: {
          'X-Shopify-Access-Token': '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', // required to access our instance
        },
      }
    )
    .then((res) => {
      console.log('statusCode : ' + res.status); // sends back status to see if worked or not
      console.log('There are ' + res.data.products.length + ' in this list.');

      for (let i = 0; i < res.data.products.length; i++) {
        var id = res.data.products[i].id;
        var title = res.data.products[i].title;
        var body_html = res.data.products[i].body_html;
        var vendor = res.data.products[i].vendor;
        var product_type = res.data.products[i].product_type;
        var created_at = res.data.products[i].created_at;
        var handle = res.data.products[i].handle;
        var updated_at = res.data.products[i].updated_at;
        var published_at = res.data.products[i].published_at;
        var template_suffix = res.data.products[i].template_suffix;
        var status = res.data.products[i].status;
        var published_scope = res.data.products[i].published_scope;
        var tags = res.data.products[i].tags;
        var admin_graphql_api_id = res.data.products[i].tags;
        var variants = res.data.products[i].variants;
        var options = res.data.products[i].options;
        var images = res.data.products[i].images;
        var image = res.data.products[i].image;
        console.log(id + ' ' + title);
        insertProductModel(
          id,
          title,
          body_html,
          vendor,
          product_type,
          created_at,
          handle,
          updated_at,
          published_at,
          template_suffix,
          status,
          published_scope,
          tags,
          admin_graphql_api_id,
          variants,
          options,
          images,
          image
        );
      }
      console.log('Finished uploading to MongoDB database.');
    })
    .catch((error) => {
      // incase of error
      console.log(error);
    });
});
function insertProductModel(
  id,
  title,
  body_html,
  vendor,
  product_type,
  created_at,
  handle,
  updated_at,
  published_at,
  template_suffix,
  status,
  published_scope,
  tags,
  admin_graphql_api_id,
  variants,
  options,
  images,
  image
) {
  var data = new ProductModel();
  data.id = id;
  data.title = title;
  data.body_html = body_html;
  data.vendor = vendor;
  data.product_type = product_type;
  data.created_at = created_at;
  data.handle = handle;
  data.updated_at = updated_at;
  data.published_at = published_at;
  data.template_suffix = template_suffix;
  data.status = status;
  data.published_scope = published_scope;
  data.tags = tags;
  data.admin_graphql_api_id = admin_graphql_api_id;
  data.variants = variants;
  data.options = options;
  data.images = images;
  data.image = image;
  data.save((err) => {
    if (err) {
      console.log(err);
    }
  });
}

router.put('/:id', (req, res) => {
  ProductModel.findByIdAndUpdate();
});

module.exports = router;
