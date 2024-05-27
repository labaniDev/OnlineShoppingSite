const { response } = require('express');
const categoryModel = require('../model/category'); 

const categoryController = {
     saveCategory : async (req, res) => {
        try {
            const { title } = req.body;
            if (!title) {
                return res.status(400).send('Please provide a title.');
            }
            const category = new categoryModel({
                title: title
            });
            await category.save();
            res.status(200).send('Category added successfully.');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
    ,
getAllCategory : async(req,res) => {
    try{
        const categories =await categoryModel.find().populate('products');
        return res.status(200).send(categories);
    }catch(error){
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
}   
}

module.exports = categoryController;