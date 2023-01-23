const productServices = require('../services/productServices.js')
const config = require('../config/config');
const logger = require('../logger/logger')

class productController {
    /**
     * create Product
     * @param {Request} req
     * @param {JSON} res
     * @returns
     * @author khushbuw
     */
    static async createProduct(req, res) {
        try {
            const requestParams = {
                "category_id": req.body.category_id,
                "name": req.body.name,
                "description":req.body.description,
            };
            console.log(requestParams)
            const data = await productServices.createProduct(requestParams);
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
         * list of Product
         * @param {Request} req
         * @param {JSON} res
         * @returns
         * @author khushbuw
         */
    static async listProduct(req, res) {
        try {
            const requestQueries = {
                "limit": req.query.limit,
                "page": req.query.page,
                "sort": req.query.sort,
                "sortingMethod": req.query.orderby,
                "key": req.query.search,
            }
            const data = await productServices.listProduct(requestQueries);
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
     * edit Product
     * @param {Request} req
     * @param {JSON} res
     * @returns
     * @author khushbuw
     */
    static async editProduct(req, res) {
        try {
            const catId = req.params.id;
            const data = await productServices.editProduct(catId);
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
     * update Product
     * @param {Request} req
     * @param {JSON} res
     * @returns
     * @author khushbuw
     */
     static async updateProduct(req, res) {
        try {
            const requestParams = {
                "category_id": req.body.category_id,
                "name": req.body.name,
                "description":req.body.description,
            };
            const id = req.params.id
            const data = await productServices.updateProduct(id, requestParams);
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
     * delete Product
     * @param {Request} req
     * @param {JSON} res
     * @returns
     * @author khushbuw
     */
    static async deleteProduct(req, res) {
        try {
            const productId = req.params.id;
            const data = await productServices.deleteProduct(productId);
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

module.exports = productController;