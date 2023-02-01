/**
 * create user model
 * @author khushbuw
 */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const validator = require('validator')
const config = require("../config/config.js")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
})

module.exports = mongoose.model('category', categorySchema);