const express = require('express');
// const app = express();
// app.use(express.json());
const router = express.Router({ mergeParams: true });
const axios = require('axios').default;
let StoreModel = require('../models/Store');
let ProductModel = require('../models/Product');

//GET all documents in MongoDB database
router.get('/', async (req, res, next) => {
  let storeId = req.params.storeId;
  const store = await StoreModel.findOne({ storeId: storeId }).exec();
  const products = await ProductModel.find({ storeId: storeId })
    .sort({ title: 'asc' })
    .exec();
  res.render('products/index', { store: store, products: products });
});

router.get('/:product_id', async (req, res) => {
  let storeId = req.params.storeId;
  const store = await StoreModel.findOne({ storeId: storeId }).exec();
  const product = await ProductModel.findOne({
    storeId: storeId,
    product_id: req.params.product_id,
  }).exec();
  res.render('products/show', { store: store, product: product });
});

//GET all documents from Shopify API into MongoDB database
router.post('/', async (req, res) => {
  const store = await StoreModel.findOne({ storeId: req.storeId }).exec();
  axios
    .get(`https://${store.url}.myshopify.com/admin/api/2022-07/products.json`, {
      // GET 'list of products'
      headers: {
        'X-Shopify-Access-Token': `${store.access_token}`, // required to access our instance
      },
    })
    .then(async (res) => {
      console.log(
        'There are ' + res.data.products.length + ' products in shopify store.'
      );
      await updateProducts(Object.values(res.data.products), req.storeId);
      console.log('Finished uploading to MongoDB database');
      const products = await ProductModel.find({ storeId: req.storeId });
      res.redirect('products/index', { store: store, products: products });
    })
    .catch((err) => {
      res.send(err);
    });
});

async function updateProducts(products, requestStoreId) {
  try {
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      filter = { product_id: product.id };
      (update = {
        $set: {
          storeId: requestStoreId,
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
        //mongoose method that finds and updates record if exists, inserts/creates if does not exist
        ProductModel.findOneAndUpdate(filter, update, { upsert: true }).catch(
          (err) => {
            console.log(err);
          }
        );
    }
  } catch (err) {
    console.log(err);
  }
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
