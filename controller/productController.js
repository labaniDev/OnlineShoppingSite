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
            rating  
        });
        await product.save();
        res.status(200).send('Product Added Successfully');

    }catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error')
    }
}    
}

module.exports = productController;