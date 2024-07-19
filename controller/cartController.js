const {response} = require('express');
const cartModel = require('../model/cart');
const productModel = require('../model/product');
const userModel = require('../model/user');

const cartController ={
addToCart : async(req,res)=>{
    try{
        const {userId} = req.params;
        const {products} = req.body;
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).send('User Not Found');
        }
        for(const item of products){
            const{productId,quantity} =item;
            const product = await productModel.findById(productId);
            if(!product){
                return res.status(404).send('Product Not found');
            }
            let cartItem = await cartModel.findOne({user:userId,products:productId});
            if (cartItem) {
                // Update the quantity of the existing cart item
                cartItem.quantity += quantity;
                // Check if final quantity is zero or negative, if so, remove the item
                if (cartItem.quantity <= 0) {
                    await cartModel.findOneAndDelete({ user: userId, products: productId });
                } else {
                    // Save the cart item
                    await cartItem.save();
                }
            } else {
                // Create a new cart item if it doesn't exist
                if (quantity > 0) {
                    cartItem = new cartModel({
                        products: [productId],
                        user: userId,
                        quantity: quantity
                    });
                    // Save the cart item
                    await cartItem.save();
                }
            }
        }
        return res.status(201).json({
            message :'Cart Added Successfully'
        })

        }catch(error){
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }

} 
}   

module.exports = cartController;