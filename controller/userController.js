const { response } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../model/user');

require('dotenv').config();
const config = {
    TOKEN_SECRET: process.env.TOKEN_SECRET
};


const userController = {

register : async(req,res) =>{

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try{
        let saveData = {
            fullname : req.body.fullname,
            email : req.body.email,
            password : hashedPassword,
            phno : req.body.phno
        }
        if(!req.body.fullname || !req.body.email || !req.body.password || !req.body.phno) {
            return res.status(400).send("Please Give All The fields");
        }
        await userModel.create(saveData);
        return res.status(200).send('User Registered Successfully');
    }catch(error){
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
} ,
login : async (req,res) =>{
    try{
        const {email , password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send('User Not Found');
        }
        const passwordCheck =  bcrypt.compare(password , user.password);
        if(!passwordCheck){
            return res.status(400).send('Password didnot match');
        }
        let payLoad = { id: user._id };
        const token = jwt.sign(payLoad, config.TOKEN_SECRET);
        return res.status(200).send({ "token": token });
    }catch(error){
        console.log(error);
        return res.status(500).send('Internal Server Error')
    }
}   
}

module.exports = userController;