const express = require('express');
const AppRouter = express.Router();

const userController = require('../controller/userController');
const categoryController = require('../controller/categoryController');
const productController = require('../controller/productController');
const verifyToken=require("../middleware/auth.js");


AppRouter.post('/register', userController.register);
AppRouter.post('/login', userController.login);
AppRouter.get('/getAllUsers',verifyToken,userController.getAllUsers);

//category Controller
AppRouter.post('/saveCategory',categoryController.saveCategory);
AppRouter.get('/getAllCategory',categoryController.getAllCategory);

//product Controller
AppRouter.post('/addProduct/:categoryId', productController.addProduct);



module.exports = AppRouter;