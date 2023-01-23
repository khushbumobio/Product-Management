const Category = require("../models/categories")
const config = require("../config/config.js")
const logger = require('../logger/logger')

class userService {
    /**
         * create Category
         * @param {object} requestParams
         * @returns {object}
         * @author khushbuw
         */
    static async createCategory(userRole,requestParams) {
        try {
            // if ((userRole == 'Admin') || (userRole == 'admin')) {

                if (!(requestParams.name) ) {
                    return ({ error: config.emptyFields });
                }
                const createdCategory = await Category.create(requestParams);
                
                logger.info({ message: "Category created", info: createdUser });
                return ({
                    success: config.recordCreated,
                });
            // } else {
            //     return ({ error: config.notAllowed });
            // }
        } catch (err) {
            logger.error({ error_message: err.message });
            return ({ error_message: err.message });
        }
    }



    /**
     * Categoryts
     * @param {object} requestParams
     * @returns {object}
     * @author khushbuw
     */
    static async listCategory(requestQueries) {
        try {
            var sortObject = {};
            const limit = requestQueries.limit
            const page = requestQueries.page
            const sort = requestQueries.sort
            const sortingMethod = requestQueries.sortingMethod
            var key = requestQueries.key
            if (!key) {
                key = ''
            }
            var userData;
            var orderBy;
            (sortingMethod === 'desc') ? orderBy = '-1' : orderBy = '1'
            var skip;
            (page <= 1) ? skip = 0 : skip = (page - 1) * limit
            sortObject[sort] = orderBy;
            categoryData = await Category.find({
                "$or": [
                    { "name": { $regex: key } },
                ]
            })
                .collation({ locale: "en" })
                .sort(sortObject)
                .skip(skip)
                .limit(limit)
                .exec()

            if (!categoryData) {
                return ({ error: config.userNotFound });
            }
            // call getCategoryData and get users data
            var finalCategoryData = await formatCategory(userData)
            return ({ data: finalCategoryData })
        } catch (err) {
            logger.error({ error_message: err.message });
            return ({ error_message: err.message });
        }
    }

    /**
     * edit Category
     * @param {object} requestParams
     * @returns {object}
     * @author khushbuw
     */
    static async editCategory(catId) {
        try {
            const id = catId
            const data = await Category.findOne({ _id: id })
            if (!data) {
                return ({ error: config.userNotFound });
            }
            const categoryData = {
                'id': data._id,
                'name': data.name,
            }
            return ({ data: categoryData })
        } catch (err) {
            logger.error({ error_message: err.message });
            return ({ error_message: err.message });
        }
    }

    /**
     * update Category
     * @param {object} requestParams
     * @returns {object}
     * @author khushbuw
     */
    static async updateCategory(id, requestParams) {
        try {
            const updates = Object.keys(requestParams)
            const allowedUpdates = ['name']
            const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

            if (!isValidOperation) {
                return ({ error: config.invalidaUpdates })
            }
            const updatedCategory = await Category.findByIdAndUpdate({ _id: id }, requestParams)
            logger.info({ message: "Category updated" }, { info: updatedCategory });
            return ({ success: config.recordUpdated })
        } catch (err) {
            logger.error({ error_message: err.message });
            return ({ error_message: err.message });
        }
    }

    /**
     * delete Category
     * @param {object} requestParams
     * @returns {object}
     * @author khushbuw
     */
    static async deleteCategory(catId) {
        try {
            const data = await Category.findOne({ _id: catId })
            if (data) {
                const deletedCategory = await Category.deleteOne({ _id: catId })
                logger.info({ message: "Category deleted", info: deletedCategory });
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
    var userDataMap = user.map((user) => {
        return {
            'id': user._id,
            'name': user.name,
        };
    })
    return userDataMap;
}


module.exports = userService;