const mongoose = require('mongoose');

const serviceShema = new mongoose.Schema({
    name : {type : String},
    mobileno :{type : String},
    email :{type : String},
    address :{type : String}
})

const schemaModel = mongoose.model('service',serviceShema);
module.exports = schemaModel;