const {response}  = require('express')
const productModel = require('../model/product');
const categoryModel = require('../model/category');


const productController ={
addProduct : async(req,res) =>{
    try{
        const categoryId = req.params.categoryId;
        const {name,discount,old_price,new_price,rating} = req.body;
        const category = await categoryModel.findById(categoryId);
        if(!category){
            return res.status(404).send('category not found');
        }
        const product = new productModel({
            name,
            discount,
            old_price,
            new_price,
            rating ,
            category:categoryId
        });
        await product.save();
        category.products.push(product._id);
        await category.save();
        res.status(200).send('Product Added Successfully');

    }catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error')
    }
},
getProductByCategoryId : async(req,res) =>{
    try{
        const categoryId = req.params.categoryId;
        const category = await categoryModel.findById(categoryId).populate('products');

        if(!category){
            res.status(404).json('Category Not Found');
        }
        // Check if products array is empty
        if (category.products.length === 0) {
            return res.status(404).json({ error: 'No products found for this category' });
        }
        res.status(200).json(category.products);
        
    }catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
},
getProductByProductId : async(req,res)=>{
    try{
        const productId = req.params.productId;
        const product = await productModel.findById({_id:productId});
        if(!product){
            res.status(404).send('Product not found');
        }
        res.status(200).send(product);

    }catch(error){
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
} ,
getProductByProductName : async(req,res) =>{
    try{
        const {name} = req.params;
        const products = await productModel.find({ name: { $regex: new RegExp(name, 'i') } });

        if(products.length ===0){
            res.status(404).send('Product Not Found');
        }
        res.status(200).send(products);
    }catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
} 
}

module.exports = productController;