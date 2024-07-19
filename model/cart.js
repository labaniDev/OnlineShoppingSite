const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    products :[{type : mongoose.Schema.Types.ObjectId, ref:'product'}],
    user :[{type:mongoose.Schema.ObjectId,ref:'user'}],
    quantity:{type:Number}
})
const Cart = mongoose.model('cart',cartSchema);
module.exports = Cart;