const mongoose = require('mongoose');
const {Schema} = mongoose;

const categorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

const categoryModel = mongoose.model('Category', categorySchema);
module.exports = categoryModel;
