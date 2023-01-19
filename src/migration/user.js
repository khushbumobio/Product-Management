/**
 * create user migration
 * @author khushbuw
 */
require('dotenv').config();
require('../../config/db');

const bcrypt = require('bcrypt');
const User = require('../models/users')

bcrypt.hash('admin', 10, (err, hash) => {
    if (err) {
        console.log(err)
    }

    const seedUsers = new User({
        "name": "Admin1",
        "email": "admin1@productmanagement.com",
        "password": hash,
        "phone_number": 9090909090,
        "address": "vadodara",
        "role": "Admin",
        "merchent_type":"small"
    })
    const seeddb = async() => {
        await User.insertMany(seedUsers)
    }

    seeddb().then(result => {
        console.log("User Inserted")
    }).catch(error => {
        console.log("error: " + error.message)
    })
})