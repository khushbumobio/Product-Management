const jwt = require('jsonwebtoken');
const User = require('../models/users');
const config = require("../config/config.js")

const auth = async(req, res, next) => {
    try {
        const authToken = req.header('Authorization');

        const decoded = jwt.verify(authToken, config.secretJWT);
        const user = await User.findOne({
            _id: decoded._id,
            'tokensAuth.token': authToken,
        });
        if (!user) {
            return res.status(401).send({
                error_message: 'Access Denied',
            });
        }
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).send({
            error_message: 'Invalid authentication token. Please login!',
        });
    }
};

module.exports = auth;