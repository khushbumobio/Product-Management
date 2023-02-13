const categoryServices = require('../services/categoryServices')
const config = require('../config/config');
const logger = require('../logger/logger')

class categoryController {
    /**
     * create category
     * @param {Request} req
     * @param {JSON} res
     * @returns
     * @author khushbuw
     */
    static async createCategory(req, res) {
        try {
            const userRole=req.user.role
            const body=req.body;
            const requestParams = {
                "name": body.name,
            };
            const categoryData = await categoryServices.createCategory(userRole,requestParams);
            if (categoryData.error) {
                return res.status(config.badRequestStatusCode).send(categoryData);
            }
             return res.status(config.successStatusCode).send(categoryData);
        } catch (err) {
             logger.error({ error_message: err.message });
            return res.status(config.internalServerErrorStatusCode).send({ error_message: err.message });
        }
    }



    /**
         * list of category
         * @param {Request} req
         * @param {JSON} res
         * @returns
         * @author khushbuw
         */
    static async listCategory(req, res) {
        try {
            const query=req.query;
            const requestQueries = {
                "limit": query.limit,
                "page": query.page,
                "sort": query.sort,
                "sortingMethod": query.orderby,
                "key": query.search,
            }
            const categoryData = await categoryServices.listCategory(requestQueries);
            if (categoryData.error) {
                 return res.status(config.badRequestStatusCode).send(categoryData);
            }
            return res.status(config.successStatusCode).send(categoryData);
        } catch (err) {
             logger.error({ error_message: err.message });
            return res.status(config.internalServerErrorStatusCode).send({ error_message: err.message });
        }
    }

    /**
     * edit category
     * @param {Request} req
     * @param {JSON} res
     * @returns
     * @author khushbuw
     */
    static async editCategory(req, res) {
        try {
            const userRole=req.user.role
            const catId = req.params.id;
            const categoryData = await categoryServices.editCategory(catId,userRole);
            if (categoryData.error) {
                return res.status(config.badRequestStatusCode).send(categoryData);
            }
             return res.status(config.successStatusCode).send(categoryData);
        } catch (err) {
             logger.error({ error_message: err.message });
            return res.status(config.internalServerErrorStatusCode).send({ error_message: err.message });
        }
    }

     /**
     * update category
     * @param {Request} req
     * @param {JSON} res
     * @returns
     * @author khushbuw
     */
     static async updateCategory(req, res) {
        try {
            const userRole=req.user.role
            const body=req.body;
            const requestParams = {
                "name": body.name,
            };
            const id = req.params.id
            const categoryData = await categoryServices.updateCategory(id, requestParams,userRole);
            if (categoryData.error) {
                return res.status(config.badRequestStatusCode).send(categoryData);
            }
            return res.status(config.successStatusCode).send(categoryData)
        } catch (err) {
            logger.error({ error_message: err.message });
            return res.status(config.internalServerErrorStatusCode).send(err.message)
        }
    }

    /**
     * delete category
     * @param {Request} req
     * @param {JSON} res
     * @returns
     * @author khushbuw
     */
    static async deleteCategory(req, res) {
        try {
            const userRole=req.user.role
            const userId = req.params.id;
            const categoryData = await categoryServices.deleteCategory(userId,userRole);
            if (categoryData.error) {
                 return res.status(config.badRequestStatusCode).send(categoryData);
            }
             return res.status(config.successStatusCode).send(categoryData);
        } catch (err) {
             logger.error({ error_message: err.message });
            return res.status(config.internalServerErrorStatusCode).send({ error_message: err.message });
        }
    }

}

module.exports = categoryController;