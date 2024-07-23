const {response} = require('express');
const serviceModel = require('../model/services');

const serviceController = {
addServices : async(req,res)=>{
    try{
        let saveData ={
            name : req.body.name,
            mobileno:req.body.mobileno,
            email : req.body.email,
            address : req.body.address
        }
        await serviceModel.create(saveData);
        return res.status(200).send('24*7 we are at your service .. feel free to tell us')

    }catch(error){
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
}    
}
module.exports = serviceController;