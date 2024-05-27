const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {type:String},
  discount:{type:String},
  old_price:{type:String},
  new_price:{type:String},
  rating:{type:String},
  category: { type: Schema.Types.ObjectId, ref: 'Category' }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

