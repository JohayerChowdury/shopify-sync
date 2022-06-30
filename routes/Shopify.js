const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();
const axios = require('axios').default;
let ProductModel = require('../models/Product');

//GET all documents in MongoDB database
router.get('/products', () => {
  getAllProducts();
});

// //GET all documents from Shopify API into MongoDB database
// router.get('/first_migration', () => {
//   axios
//     .get(
//       'https://test-store-ap.myshopify.com/admin/api/2022-04/products.json',
//       {
//         // GET 'list of products'
//         headers: {
//           'X-Shopify-Access-Token': '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', // required to access our instance
//         },
//       }
//     )
//     .then((res) => {
//       console.log(
//         'There are ' + res.data.products.length + ' in shopify store.'
//       );

//       for (let i = 0; i < res.data.products.length; i++) {
//         insertProductModel(
//           res.data.products[i].id,
//           res.data.products[i].title,
//           res.data.products[i].body_html,
//           res.data.products[i].vendor,
//           res.data.products[i].product_type,
//           res.data.products[i].created_at,
//           res.data.products[i].handle,
//           res.data.products[i].updated_at,
//           res.data.products[i].published_at,
//           res.data.products[i].template_suffix,
//           res.data.products[i].status,
//           res.data.products[i].published_scope,
//           res.data.products[i].tags,
//           res.data.products[i].tags,
//           res.data.products[i].variants,
//           res.data.products[i].options,
//           res.data.products[i].images,
//           res.data.products[i].image
//         );
//       }
//       console.log('Finished uploading to MongoDB database.');
//     })
//     .catch((error) => {
//       // incase of error
//       console.log(error);
//     });
// });

//GET all documents from Shopify API into MongoDB database
router.get('/insert_new_products', () => {
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
      // numberOfProductsOld = getAllProducts().length;
      console.log(
        'There are ' + res.data.products.length + ' products in shopify store.'
      );
      updateProducts(Object.values(res.data.products));
      console.log('Finished uploading to MongoDB database');
      // numberOfProductsNew = getAllProducts().length;
      // console.log('Number of products before insert: ' + numberOfProductsOld);
      // console.log('Number of products after insert: ' + numberOfProductsNew);
    })
    .catch((err) => {
      console.log(err);
    });
});

async function updateProducts(products) {
  try {
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      filter = { id: product.id };
      (update = {
        $set: {
          title: product.title,
          body_html: product.body_html,
          vendor: product.vendor,
          product_type: product.product_type,
          created_at: product.created_at,
          handle: product.handle,
          updated_at: product.updated_at,
          published_at: product.published_at,
          template_suffix: product.template_suffix,
          status: product.status,
          published_scope: product.published_scope,
          tags: product.tags,
          admin_graphql_api_id: product.tags,
          variants: product.variants,
          options: product.options,
          images: product.images,
          image: product.image,
        },
      }),
        ProductModel.findOneAndUpdate(filter, update, { upsert: true })
          .then(
            console.log(product.id + ' ' + product.title + ' Successfuly saved')
          )
          .catch((err) => {
            console.log(err);
          });
    }
  } catch (err) {
    console.log(err);
  }
}

function getAllProducts() {
  ProductModel.find({}, function (err, documents) {
    if (err) {
      res.send('Something went wrong with finding ALL documents');
    } else {
      return documents;
    }
  });
}

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
  console.log(id + ' ' + title);
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
module.exports = router;
