const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    fullname : {type : String},
    phno : {type : String}
})

const driverModel = mongoose.model('driver',driverSchema);
module.exports = driverModel;