const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name : {type : String},
    email :{type: String},
    subject : {type:String},
    message :{type:String}
})

const contactModel = mongoose.model('contactus',contactSchema);
module.exports = contactModel;