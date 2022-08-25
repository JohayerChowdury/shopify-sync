//Purpose: Create a controller that calls Mongoose functions and can be exported.

let UserModel = require('../models/User');
let StoreModel = require('../models/Store');
let ProductModel = require('../models/Product');
const axios = require('axios');

//return to this code fragment to optimize add and update methods
// function saveStore() {
//   return async (req, res) => {
//     let store = req.store;
//     if (!req.body.storeId) {
//       res.status(400).send({ message: 'storeId cannot be empty!' });
//     } else {
//       store.storeId = req.body.storeId;
//     }
//     if (!req.body.url) {
//       res.status(400).send({ message: 'url cannot be empty!' });
//     } else {
//       store.url = req.body.url;
//     }
//     if (!req.body.access_token) {
//       res.status(400).send({ message: 'access token cannot be empty!' });
//     } else {
//       store.access_token = req.body.access_token;
//     }
//     if (!req.body.name) {
//       res.status(400).send({ message: 'name cannot be empty!' });
//     } else {
//       store.name = req.body.name;
//     }
//     store.address = req.body.address;
//     try {
//       store = await store.save();
//       res.send(store);
//     } catch (err) {
//       res.status(500).send({ message: err.message || 'Error Occurred' });
//     }
//   };
// }

exports.getAll = async (req, res) => {
  try {
    const stores = await StoreModel.find({ owner: req.userId })
      .populate('owner')
      .sort({ name: 'asc' })
      .exec();
    res.send(stores);
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error Occurred' });
  }
};

exports.getAllCount = async (req, res) => {
  try {
    const numStores = await StoreModel.countDocuments({
      owner: req.userId,
    }).exec();
    res.send(`${numStores}`);
    // res.send({ numStores: numStores });
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error Occurred' });
  }
};

exports.getOne = async (req, res) => {
  let storeId = req.params.storeId;
  try {
    const store = await StoreModel.findById(storeId).populate('owner').exec();
    if (store == null) {
      res.status(404).send({ message: 'No store found with id: ' + storeId });
    } else {
      res.send(store);
    }
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error Occurred' });
  }
};

exports.add = (req, res) => {
  // const user = await UserModel.findOne({ownerId: })
  if (!req.body.url) {
    res.status(400).send({ message: 'url cannot be empty!' });
  }
  if (!req.body.access_token) {
    res.status(400).send({ message: 'access token cannot be empty!' });
  }
  if (!req.body.name) {
    res.status(400).send({ message: 'name cannot be empty!' });
  }
  // console.log('Owner in store controller add method is: ' + req.userId);
  const store = new StoreModel({
    name: req.body.name,
    url: req.body.url,
    access_token: req.body.access_token,
    address: req.body.address,
    owner: req.userId,
  });
  store
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || 'Error Occurred' });
    });
};

exports.update = (req, res) => {
  if (!req.body.url) {
    res.status(400).send({ message: 'url cannot be empty!' });
  }
  if (!req.body.access_token) {
    res.status(400).send({ message: 'access token cannot be empty!' });
  }
  if (!req.body.name) {
    res.status(400).send({ message: 'name cannot be empty!' });
  }

  const storeId = req.params.storeId;
  StoreModel.findByIdAndUpdate(storeId, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update store with id=${storeId}. Maybe Store was not found!`,
        });
      } else res.send({ message: 'Store was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || 'Error Occurred' });
    });
};

exports.delete = async (req, res, callback) => {
  let storeId = req.params.storeId;
  try {
    await StoreModel.findByIdAndDelete(storeId, function (err, doc) {
      if (err) {
        console.log(err);
      }
      doc.remove(callback);
    });
    res.send({ message: 'Store was deleted successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error Occurred' });
  }
};

exports.getProducts = async (req, res) => {
  let storeId = req.params.storeId;
  try {
    const products = await ProductModel.find({ store: storeId })
      .populate('store')
      .sort({ title: 'asc' })
      .exec();
    res.send(products);
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error Occurred' });
  }
};

// exports.getProductsCount = async (req, res) => {
//   try {
//     const numProducts = await ProductModel.countDocuments({
//       store: req.params.storeId,
//     })
//       .populate('store')
//       .exec();
//     console.log(`${numProducts}`);
//     res.send(`${numProducts}`);
//     // res.send({ numStores: numStores });
//   } catch (err) {
//     res.status(500).send({ message: err.message || 'Error Occurred' });
//   }
// };

exports.sync = async (req, res) => {
  let storeId = req.params.storeId;
  //CHANGE!!!
  const store = await StoreModel.findById(storeId).populate('products').exec();
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
      //CHANGE !!!
      await updateProducts(Object.values(res.data.products), storeId);
      console.log('Finished uploading to MongoDB database');
      //CHANGE !!!
      const products = await ProductModel.find({ store: storeId });
      res.send(products);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getOneProduct = async (req, res) => {
  try {
    const product = await ProductModel.findOne({
      store: req.params.storeId,
      product_id: req.params.productId,
    }).exec();
    res.send(product);
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error Occurred' });
  }
};

async function updateProducts(products, requestStoreId) {
  try {
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      filter = { product_id: product.id };
      (update = {
        $set: {
          //CHANGE !!!
          store: requestStoreId,
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
