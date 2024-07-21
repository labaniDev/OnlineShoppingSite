const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }], // Array of product references
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    quantity: { type: Number }
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;

