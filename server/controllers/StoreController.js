//Purpose: Create a controller that calls Mongoose functions and can be exported.

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
    const stores = await StoreModel.find().sort({ name: 'asc' }).exec();
    res.send(stores);
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error Occurred' });
  }
};

exports.getOne = async (req, res) => {
  let storeId = req.params.storeId;
  try {
    //CHANGE !!!

    const store = await StoreModel.findOne({ storeId: storeId }).exec();
    if (store == null) {
      res.status(404).send({ message: 'No store found with id: ' + storeId });
    } else {
      res.send(store);
    }
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error Occurred' });
  }
};

// exports.add = async (req, res) => {
//   let store = req.store;
//   if (!req.body.storeId) {
//     res.status(400).send({ message: 'storeId cannot be empty!' });
//   } else {
//     store.storeId = req.body.storeId;
//   }
//   if (!req.body.url) {
//     res.status(400).send({ message: 'url cannot be empty!' });
//   } else {
//     store.url = req.body.url;
//   }
//   if (!req.body.access_token) {
//     res.status(400).send({ message: 'access token cannot be empty!' });
//   } else {
//     store.access_token = req.body.access_token;
//   }
//   if (!req.body.name) {
//     res.status(400).send({ message: 'name cannot be empty!' });
//   } else {
//     store.name = req.body.name;
//   }
//   store.address = req.body.address;
//   try {
//     store = await store.save();
//     res.send(store);
//   } catch (err) {
//     res.status(500).send({ message: err.message || 'Error Occurred' });
//   }
// };

exports.add = (req, res) => {
  if (!req.body.url) {
    res.status(400).send({ message: 'url cannot be empty!' });
  }
  if (!req.body.access_token) {
    res.status(400).send({ message: 'access token cannot be empty!' });
  }
  if (!req.body.name) {
    res.status(400).send({ message: 'name cannot be empty!' });
  }
  const store = new StoreModel({
    name: req.body.name,
    url: req.body.url,
    access_token: req.body.access_token,
    address: req.body.address,
  });
  store
    .save(store)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || 'Error Occurred' });
    });
};

// exports.update = async (req, res) => {
//   req.store = await StoreModel.findOne({
//     storeId: req.params.storeId,
//   }).exec();
//   let store = req.store;
//   if (!req.body.storeId) {
//     res.status(400).send({ message: 'storeId cannot be empty!' });
//   } else {
//     store.storeId = req.body.storeId;
//   }
//   if (!req.body.url) {
//     res.status(400).send({ message: 'url cannot be empty!' });
//   } else {
//     store.url = req.body.url;
//   }
//   if (!req.body.access_token) {
//     res.status(400).send({ message: 'access token cannot be empty!' });
//   } else {
//     store.access_token = req.body.access_token;
//   }
//   if (!req.body.name) {
//     res.status(400).send({ message: 'name cannot be empty!' });
//   } else {
//     store.name = req.body.name;
//   }
//   store.address = req.body.address;
//   try {
//     store = await store.save();
//     res.send(store);
//   } catch (err) {
//     res.status(500).send({ message: err.message || 'Error Occurred' });
//   }
// };

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
  //CHANGE!!!!
  StoreModel.findOneAndUpdate({ storeId: storeId }, req.body, {
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

exports.delete = async (req, res) => {
  let storeId = req.params.storeId;
  try {
    //CHANGE!!!
    await StoreModel.findOneAndDelete({ storeId: storeId });
    res.send({ message: 'Store was deleted successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error Occurred' });
  }
};

exports.getProducts = async (req, res) => {
  let storeId = req.params.storeId;
  try {
    // const store = await StoreModel.find({ storeId: storeId });
    // console.log('Store is: ' + store);
    //CHANGE!!!
    const products = await ProductModel.find({ storeId: storeId })
      .sort({ title: 'asc' })
      .exec();
    res.send(products);
  } catch (err) {
    res.status(500).send({ message: err.message || 'Error Occurred' });
  }
};

exports.sync = async (req, res) => {
  let storeId = req.params.storeId;
  //CHANGE!!!
  const store = await StoreModel.findOne({ storeId: storeId }).exec();
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
      const products = await ProductModel.find({ storeId: storeId });
      res.send(products);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getSpecificProduct = async (req, res) => {
  let storeId = req.params.storeId;
  try {
    //CHANGE !!!

    const product = await ProductModel.findOne({
      storeId: storeId,
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
