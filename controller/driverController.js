const {response} = require('express');
const driverModel = require('../model/driver');

const driverController ={

addDriver : async(req,res) =>{
    try{

        let saveData = {
            fullname: req.body.fullname,
            phno : req.body.phno
        }
        await driverModel.create(saveData);
        return res.status(200).send('Driver added Successfully');

    }catch(error){
        console.log(error);
        return res.status(500).send('Internal Server Error');

    }
} ,
getDriver : async(req,res)=>{
    try{
        const driver = await driverModel.find();
        if(!driver){
            return res.status(404).send('Driver Not found');
        }
        return res.status(200).send(driver);

    }catch(error){
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
}   
}
module.exports = driverController;