/**
 * create user model
 * @author khushbuw
 */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const validator = require('validator')
const config = require('../config/config')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    phone_number: {
        type: Number
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    merchent_type: {
        type: String,
        required: true,
        trim: true,
    },
    token: {
        type: String,
        default: 0
    },
    tokensAuth: [{
        token: {
            type: String,
            default: 0
        }
    }]
})

// generate jwt token
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, config.secretJWT)
    user.tokensAuth = user.tokensAuth.concat({ token })
    await user.save()
    return token
}

module.exports = mongoose.model('user', userSchema);