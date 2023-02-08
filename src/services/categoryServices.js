const Category = require("../models/categories")
const Product =require("../models/products")
const config = require("../config/config.js")
const logger = require('../logger/logger')

class categoryService {
    /**
         * create Category
         * @param {object} requestParams
         * @returns {object}
         * @author khushbuw
         */
    static async createCategory(userRole,requestParams) {
        try {
            if ((userRole == 'Admin') || (userRole == 'admin')) {
                if (!(requestParams.name) ) {
                    return ({ error: config.emptyFields });
                }
                const createdCategory = await Category.create(requestParams);
                
                logger.info({ message: "Category created", info: createdCategory });
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
     * Category list
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
            var categoryData;
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
            var finalCategoryData = await formatCategory(categoryData)
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
    static async editCategory(catId,userRole) {
        try {
            if ((userRole == 'Admin') || (userRole == 'admin')) {
            const id = catId
            const data = await Category.findOne({ _id: id })
            if (!data) {
                return ({ error: config.dataNotFound });
            }
            const categoryData = {
                'id': data._id,
                'name': data.name,
            }
            return ({ data: categoryData })
        } else {
            return ({ error: config.generatePasswordNotAllow });
        }
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
    static async updateCategory(id, requestParams,userRole) {
        try {
            if ((userRole == 'Admin') || (userRole == 'admin')) {
            const updates = Object.keys(requestParams)
            const allowedUpdates = ['name']
            const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

            if (!isValidOperation) {
                return ({ error: config.invalidaUpdates })
            }
            const updatedCategory = await Category.findByIdAndUpdate({ _id: id }, requestParams)
            logger.info({ message: "Category updated" }, { info: updatedCategory });
            return ({ success: config.recordUpdated })
        } else {
            return ({ error: config.generatePasswordNotAllow });
        }
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
    static async deleteCategory(catId,userRole) {
        try {
            if ((userRole == 'Admin') || (userRole == 'admin')) {
            const data = await Category.findOne({ _id: catId })
            if (data) {
              const checkData = await Product.findOne({ category_id: data._id });
              if (!checkData) {
                await Category.deleteOne({ _id: catId });
                return {
                  success: config.recordDeleted,
                };
              }
              return {
                error: config.categoryAlreadyAssign,
              };
            }
            return {
              error: config.noData,
            };
        } else {
            return ({ error: config.generatePasswordNotAllow });
        }
        } catch (err) {
            logger.error({ error_message: err.message });
            return ({ error_message: err.message });
        }
    }


}

/**
* format category data
* @param {object} category 
* @returns {object}
* @author khushbuw
*/
const formatCategory = async (category) => {
    var categoryDataMap = category.map((category) => {
        return {
            'id': category._id,
            'name': category.name,
        };
    })
    return categoryDataMap;
}


module.exports = categoryService;