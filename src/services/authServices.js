const User = require("../models/users")
const bcrypt = require('bcrypt');
const config = require("../config/config.js")
const jwt = require('jsonwebtoken');
const logger = require('../logger/logger');

class authService {
    /**
         * This will login in the user and return authentication token and user data
         * @param {object} requestParams
         * @returns {object}
         * @author khushbuw
         */
    static async login(requestParams) {
        try {
            // return (requestParams.email )
            if (!(requestParams.email || requestParams.password)) {
                return { error: config.emptyFields }
            }
            const email = requestParams.email;
            const user = await User.findOne({ email })
            if (!user) {
                return { error: config.emailNotExists }
            }
            const isMatch = await bcrypt.compare(requestParams.password, user.password)
            const token = await user.generateAuthToken()
            if (!isMatch) {
                return { error: config.unableToLogin }
            }
            return ({
                success: config.logInSuccess,
                data: user,
                token: token
            })
        } catch (err) {
            logger.error({ error_message: err.message });
            return ({ error_message: err.message });
        }
    }
    /**
         * profile
         * @param {object} requestParams
         * @returns {object}
         * @author khushbuw
         */
    static async profile(user) {
        try {
            if (!user) {
                return ({ error: config.userNotFound });
            }
            const newData = {
                'name': user.name,
                'email': user.email,
                'phone_number': user.phone_number,
                'address': user.address,
                'role': user.role,
                'merchent_type': user.merchent_type
            }
            return ({ profile: newData })
        } catch (err) {
            logger.error({ error_message: err.message });
            return ({ error_message: err.message });
        }
    }

    /**
         * update profile
         * @param {object} requestParams
         * @returns {object}
         * @author khushbuw
         */
    static async updateProfile(id, requestParams) {
        try {
            const updates = Object.keys(requestParams)
            const allowedUpdates = ['name', 'phone_number', 'address', 'role', 'merchent_type']
            const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

            if (!isValidOperation) {
                return ({ error: config.invalidaUpdates })
            }
            const updatedUser = await User.findByIdAndUpdate({ _id: id }, requestParams)
            logger.info({ message: "user updated" }, { info: updatedUser });
            return ({ success: config.recordUpdated })
        } catch (err) {
            logger.error({ error_message: err.message });
            return ({ error_message: err.message });
        }
    }

    /**
     * logout user
     * @param {object} requestParams
     * @returns {object}
     * @author khushbuw
     */
    static async logOut(user) {
        try {
            user.tokensAuth = []
            await user.save()
            return ({ success: config.logOut })
        } catch (err) {
            logger.error({ error_message: err.message });
            return ({ error_message: err.message });
        }
    }
}

module.exports = authService;