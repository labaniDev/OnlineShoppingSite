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
 } ,
 orderRecieved:async(req,res)=>{
    try{
        const {userId}=req.body;
        const user=await userModel.findById(userId);
        if(!user){
            return res.status(404).send('User Not Found');
        }
        const pendingOrder=await orderModel.findOne({userId:userId,status:'pending'});
        if(!pendingOrder){
            return res.status(404).send('Pending order not found');
        }
        const updateOrder=await orderModel.findByIdAndUpdate(
            {_id:pendingOrder._id},
            {$set:{status:'placed'}},
            {new:true}
        
        );
        if(!updateOrder){
            return res.status(404).send('Order not found or already Processed');
        }
        await cartModel.deleteMany({user:userId});
        return res.status(200).send('Order Recieved Successfully');

    }catch(error){
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
 },
 getOrders:async(req,res)=>{
    try{
        const userId = req.params.userId;
        if(!userId){
            return res.status(400).send('UserId is required');
        }
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).send('user not found');
        }
        const orders = await orderModel.find({userId:userId,status:'placed'});
        return res.status(200).send(orders);

    }catch(error){
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
 },
 cancelOrder:async(req,res)=>{
    try{
        const {userId}=req.body;
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).send('User Not Found');
        }
        const placedOrder = await orderModel.findOne({userId:userId,status:'placed'});
        if(!placedOrder){
            return res.status(400).send('You have no placed Order');
        }
        const updateOrder = await orderModel.findByIdAndUpdate(
            {_id:placedOrder._id},
            {$set:{status:'cancelled'}},
            {new:true}
        )
        if(!updateOrder){
            return res.status(404).send('Order not found or already cancelled');
        }
        return res.status(200).send('Order Cancelled Succesfully');

    }catch(error){
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
 }



}
module.exports=orderController;
