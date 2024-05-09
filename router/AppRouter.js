const express = require('express');
const AppRouter = express.Router();

const userController = require('../controller/userController');
const verifyToken=require("../middleware/auth.js");


AppRouter.post('/register', userController.register);
AppRouter.post('/login', userController.login);
AppRouter.get('/getAllUsers',verifyToken,userController.getAllUsers)


module.exports = AppRouter;