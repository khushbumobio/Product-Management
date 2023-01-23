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
            const requestParams = {
                "name": req.body.name,
            };
            const data = await categoryServices.createCategory(requestParams);
            if (data.error) {
                return res.status(config.successStatusCode).send(data);
            }
             return res.status(config.successStatusCode).send(data);
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
            const requestQueries = {
                "limit": req.query.limit,
                "page": req.query.page,
                "sort": req.query.sort,
                "sortingMethod": req.query.orderby,
                "key": req.query.search,
            }
            const data = await categoryServices.listCategory(requestQueries);
            if (data.error) {
                 return res.status(config.successStatusCode).send(data);
            }
            return res.status(config.successStatusCode).send(data);
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
            const catId = req.params.id;
            const data = await categoryServices.editCategory(catId);
            if (data.error) {
                return res.status(config.successStatusCode).send(data);
            }
             return res.status(config.successStatusCode).send(data);
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
            const requestParams = {
                "name": req.body.name,
            };
            const id = req.params.id
            const data = await categoryServices.updateCategory(id, requestParams);
            if (data.error) {
                return res.status(config.successStatusCode).send(data);
            }
            return res.status(config.successStatusCode).send(data)
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
            const userId = req.params.id;
            const data = await categoryServices.deleteCategory(userId);
            if (data.error) {
                 return res.status(config.successStatusCode).send(data);
            }
             return res.status(config.successStatusCode).send(data);
        } catch (err) {
             logger.error({ error_message: err.message });
            return res.status(config.internalServerErrorStatusCode).send({ error_message: err.message });
        }
    }

}

module.exports = categoryController;