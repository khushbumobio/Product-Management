const User = require("../models/users")
const bcrypt = require('bcrypt');
const config = require("../config/config.js")
const logger = require('../logger/logger')
const {sendMail}=require('../utills/sendMail')


class userService {
    /**
         * create user
         * @param {object} requestParams
         * @returns {object}
         * @author khushbuw
         */
    static async createUser(userRole, requestParams,password) {
        try {
            if (userRole == 'admin') {
                if (!(requestParams.name || requestParams.email || requestParams.password || requestParams.phone_number || requestParams.address || requestParams.role || requestParams.merchent_type)) {
                    return ({ error: config.emptyFields });
                }
                const checkEmail = await User.findOne({ email: requestParams.email })
                if (checkEmail) {
                    return ({ error: config.emailExists });
                }
                const createdUser = await User.create(requestParams);
                if((createdUser.role =='customer')||(createdUser.role =='Customer')){
                    await sendMail(requestParams.name,requestParams.email, password)
                    logger.info("success: ", "email send")
                }
                logger.info({ message: "user created", info: createdUser });
                return ({
                    success: config.recordCreated,
                });
            } else {
                return ({ error: config.notAllowedCreate });
            }


        } catch (err) {
            logger.error({ error_message: err.message });
            return ({ error_message: err.message });
        }
    }



    /**
     * users lists
     * @param {object} requestParams
     * @returns {object}
     * @author khushbuw
     */
    static async listUser(requestQueries) {
        try {
            let sortObject = {};
            const limit = requestQueries.limit
            const page = requestQueries.page
            const sort = requestQueries.sort
            const sortingMethod = requestQueries.sortingMethod
            let key = requestQueries.key
            if (!key) {
                key = ''
            }
            let userData;
            const orderBy =  (sortingMethod === 'desc') ? -1 : 1;
            const skip=(page <= 1) ? 0 : (page - 1) * limit;
            sortObject[sort] = orderBy;
            userData = await User.find({
                "$or": [
                    { "first_name": { $regex: key } },
                    { "last_name": { $regex: key } },
                    { "email": { $regex: key } },
                    { "address": { $regex: key } },
                    { "role": { $regex: key } },
                    { "merchant_type": { $regex: key } },
                ]
            })
                .collation({ locale: "en" })
                .sort(sortObject)
                .skip(skip)
                .limit(limit)
                .exec()

            if (!userData) {
                return ({ error: config.userNotFound });
            }
            // call getUserData and get users data
            let finalUserData = await formatUser(userData)
            return ({ data: finalUserData })
        } catch (err) {
            logger.error({ error_message: err.message });
            return ({ error_message: err.message });
        }
    }

    /**
     * edit user
     * @param {object} requestParams
     * @returns {object}
     * @author khushbuw
     */
    static async editUser(userId) {
        try {
            const id = userId
            const data = await User.findOne({ _id: id })
            if (!data) {
                return ({ error: config.userNotFound });
            }
            const userData = {
                'id': data._id,
                'name': data.name,
                'last_name': data.last_name,
                'email': data.email,
                'phone_number': data.phone_number,
                'role': data.role,
                'merchant_type': data.merchant_type,
            }
            return ({ data: userData })
        } catch (err) {
            logger.error({ error_message: err.message });
            return ({ error_message: err.message });
        }
    }

    /**
     * update user
     * @param {object} requestParams
     * @returns {object}
     * @author khushbuw
     */
    static async updateUser(id, requestParams) {
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
     * delete user
     * @param {object} requestParams
     * @returns {object}
     * @author khushbuw
     */
    static async deleteUser(userId,userRole) {
        try {
            if(userRole == 'customer')  
                {
                    return ({
                        success: config.generatePasswordNotAllow
                    });
                }
            const data = await User.findOne({ _id: userId })
            if (data) {
                const deletedUser = await User.deleteOne({ _id: userId })
                logger.info({ message: "user deleted", info: deletedUser });
                return ({
                    success: config.recordDeleted
                });
            }
            return ({
                error: config.noData
            });
        } catch (err) {
            logger.error({ error_message: err.message });
            return ({ error_message: err.message });
        }
    }


}

/**
* format user data
* @param {object} publisher 
* @returns {object}
* @author khushbuw
*/
const formatUser = async (user) => {
    let userDataMap = user.map((user) => {
        return {
            'id': user._id,
            'name': user.name,
            'email': user.email,
            'phone_number': user.phone_number,
            'address': user.address,
            'role': user.role,
            'merchent_type': user.merchent_type
        };
    })
    return userDataMap;
}


module.exports = userService;