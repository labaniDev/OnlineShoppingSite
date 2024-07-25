const {response} = require('express');
const contactModel = require('../model/contact');

const contactController ={
saveContactUs : async(req,res)=>{
    try{

        let saveData = {
            name : req.body.name,
            email : req.body.email,
            message :req.body.message,
            subject : req.body.subject
        }
        await contactModel.create(saveData);
        return res.status(200).send('Thank you for Contact us .. We will reach you soon');

    }catch(error){
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
}    
}
module.exports = contactController;