const express = require('express');
const AppRouter = express.Router();

const userController = require('../controller/userController');

AppRouter.post('/register', userController.register);



module.exports = AppRouter;