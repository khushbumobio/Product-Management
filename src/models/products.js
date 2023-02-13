/**
 * @name state model
 * @author khushbuw
 */
const mongoose = require('mongoose');
const category = require('./categories');
var Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    qrCode: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy:{
        type: String,
        required: true,
        trim: true,
    }
})

module.exports = mongoose.model('products', productSchema);