const express = require('express');
const AppRouter = express.Router();

const userController = require('../controller/userController');
const categoryController = require('../controller/categoryController');
const productController = require('../controller/productController');
const cartController = require('../controller/cartController');
const verifyToken=require("../middleware/auth.js");


AppRouter.post('/register', userController.register);
AppRouter.post('/login', userController.login);
AppRouter.get('/getAllUsers',verifyToken,userController.getAllUsers);

//category Controller
AppRouter.post('/saveCategory',categoryController.saveCategory);
AppRouter.get('/getAllCategory',categoryController.getAllCategory);

//product Controller
AppRouter.post('/addProduct/:categoryId', productController.addProduct);
AppRouter.get('/getProductByCategoryId/:categoryId',productController.getProductByCategoryId);
AppRouter.get('/getProductByproductId/:productId',productController.getProductByProductId);
AppRouter.get('/getProductByproductName/:name',productController.getProductByProductName);

//cartController
AppRouter.post('/addToCart/:userId',cartController.addToCart);


module.exports = AppRouter;