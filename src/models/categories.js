/**
 * create user model
 * @author khushbuw
 */
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
})

module.exports = mongoose.model('category', categorySchema);