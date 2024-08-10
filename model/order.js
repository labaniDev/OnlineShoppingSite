const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const orderSchema=new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref:'user',
        required:true

    },
    carts:[{
        type: Schema.Types.ObjectId,
        ref:'cart',
        required:true
}],
    totalPrice:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        required:true,
        enum :['pending','placed','cancelled']
    },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,
      image: {type:String},
      discount:{type:String},
      old_price:{type:String},
      new_price:{type:String},
      rating:{type:String},
        quantity: { type: Number, required: true }
    }],
    });
    const orderModel=mongoose.model('order',orderSchema);
    module.exports=orderModel;