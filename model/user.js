const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{type:String},
    email:{type:String},
    password:{type:String},
    phno:{type:String}
})

const userModel = mongoose.model('user' , userSchema, 'users');

module.exports = userModel;