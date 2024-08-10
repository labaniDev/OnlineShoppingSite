  const {response}=require('express');
  const userModel=require('../model/user');
  const cartModel=require('../model/cart');
  const productModel=require('../model/product');
  const orderModel=require('../model/order');

  const orderController={

 calculateTotalPrice:async(req,res)=>{
    try{
        const{userId,carts}=req.body;

        const user= await userModel.findById(userId);
        if(!user){
            return res.status(404).send("can't find user with this id");
        }
        let totalPrice=0;
        const cartIds=[];
        const productList=[];
        //Iterate over each cart in the array
        for(const cart of carts){
            const cartData=await cartModel.findById(cart._id);
            if(!cartData){
                return res.status(404).send(`cart with ${cart._id} not found`);
            }
            cartIds.push(cart._id);

            //Iterarate over product in the array
            for(const product of cartData.products){
                const productData=await productModel.findById(product);
                if(!productData){
                    return res.status(404).send(`product with ${product} not found`);
                }
                const newPrice=parseFloat(productData.new_price);
                console.log(newPrice);
                const quantity=cartData.quantity;
                console.log(quantity);
                totalPrice+=quantity*newPrice;
                console.log(totalPrice);

                productList.push({
                    productId :productData._id,
                    name : productData.name,
                    old_price : productData.old_price,
                    new_price : productData.new_price,
                    discount : productData.discount,
                    image : productData.image,
                    quantity: cartData.quantity 
                })

            }
        }

        const order=new orderModel({
            userId,
            carts:cartIds,
            products:productList,
            totalPrice,
            status:'pending'
        });
        await order.save();
        console.log('Order Saved Successfully:',order);
        return res.status(200).send({totalPrice});

    }catch(error){
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
 }   


}
module.exports=orderController;