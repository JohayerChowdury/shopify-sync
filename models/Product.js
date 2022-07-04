const mongoose = require('mongoose');

//initializing variant schema
const VariantSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  product_id: {
    type: Number,
  },
  title: {
    type: String,
  },
  price: {
    type: String,
  },
  sku: {
    type: String,
  },
  position: {
    type: Number,
  },
  inventory_policy: {
    type: String,
  },
  compare_at_price: {},
  fulfillment_service: {
    type: String,
  },
  inventory_management: {
    type: String,
  },
  option1: {
    type: String,
  },
  option2: { type: String },
  option3: { type: String },
  created_at: {
    type: String,
  },
  updated_at: {
    type: String,
  },
  taxable: {
    type: Boolean,
  },
  barcode: {},
  grams: {
    type: Number,
  },
  image_id: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  weight_unit: {
    type: String,
  },
  inventory_item_id: {
    type: Number,
  },
  inventory_quantity: {
    type: Number,
  },
  old_inventory_quantity: {
    type: Number,
  },
  requires_shipping: {
    type: Boolean,
  },
  admin_graphql_api_id: {
    type: String,
  },
  required: [
    'id',
    'product_id',
    'title',
    'price',
    'sku',
    'position',
    'inventory_policy',
    'compare_at_price',
    'fulfillment_service',
    'inventory_management',
    'option1',
    'option2',
    'option3',
    'created_at',
    'updated_at',
    'taxable',
    'barcode',
    'grams',
    'image_id',
    'weight',
    'weight_unit',
    'inventory_item_id',
    'inventory_quantity',
    'old_inventory_quantity',
    'requires_shipping',
    'admin_graphql_api_id',
  ],
});

//initializing option schema
const OptionSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  product_id: {
    type: Number,
  },
  name: {
    type: String,
  },
  position: {
    type: Number,
  },
  values: {
    type: [String],
  },
  required: ['id', 'product_id', 'name', 'position', 'values'],
});

//initializing image schema
const ImageSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  product_id: {
    type: Number,
  },
  position: {
    type: Number,
  },
  created_at: {
    type: String,
  },
  updated_at: {
    type: String,
  },
  alt: {
    type: String,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  src: {
    type: String,
  },
  variant_ids: {
    type: [Number],
  },
  admin_graphql_api_id: {
    type: String,
  },
  required: [
    'id',
    'product_id',
    'position',
    'created_at',
    'updated_at',
    'alt',
    'width',
    'height',
    'src',
    'variant_ids',
    'admin_graphql_api_id',
  ],
});

//initializing Product model
const productSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    index: { unique: true },
  },
  title: {
    type: String,
  },
  body_html: {
    type: String,
  },
  vendor: {
    type: String,
  },
  product_type: {
    type: String,
  },
  created_at: {
    type: Date,
  },
  handle: {
    type: String,
  },
  updated_at: {
    type: Date,
  },
  published_at: { type: Date },
  template_suffix: {
    type: String,
  },
  status: {
    type: String,
  },
  published_scope: {
    type: String,
  },
  tags: {
    type: String,
  },
  admin_graphql_api_id: {
    type: String,
  },
  variants: {
    type: [VariantSchema],
  },
  options: {
    type: [OptionSchema],
  },
  images: {
    type: [ImageSchema],
  },
  image: {
    type: ImageSchema,
  },
  required: [
    'id',
    'title',
    'body_html',
    'vendor',
    'product_type',
    'created_at',
    'handle',
    'updated_at',
    'published_at',
    'template_suffix',
    'status',
    'published_scope',
    'tags',
    'admin_graphql_api_id',
    'variants',
    'options',
    'images',
    'image',
  ],
});

productSchema.query.byProductId = (product_id) => {
  return this.where({ product_id: product_id });
};

module.exports = mongoose.model('Product', productSchema);
