const {response} = require('express');
const cartModel = require('../model/cart.js');
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

} ,
getCartItems : async(req,res) => {
    try {
        const { userId } = req.params;

        // Ensure the user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch all cart items for the user and populate the product details
        let cartItems = await cartModel.find({ user: userId }).populate('products');

        // Filter out cart items with quantity 0
        //cartItems = cartItems.filter(item => item.quantity > 0);

        res.status(200).json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
}   

module.exports = cartController;