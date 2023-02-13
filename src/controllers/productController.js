const productServices = require('../services/productServices')
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
            const user=req.user;
            const body=req.body;
            const requestParams = {
                "category_id": body.category_id,
                "name": body.name,
                "description":body.description,
                "createdBy":user._id
            };
            const product = await productServices.createProduct(requestParams,user);
            if (product.error) {
                return res.status(config.badRequestStatusCode).send(product);
            }
             return res.status(config.successStatusCode).send(product);
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
            const query=req.query;
            const requestQueries = {
                "limit": query.limit,
                "page": query.page,
                "sort": query.sort,
                "sortingMethod": query.orderby,
                "key": query.search,
            }
            const product = await productServices.listProduct(requestQueries);
            if (product.error) {
                 return res.status(config.badRequestStatusCode).send(product);
            }
            return res.status(config.successStatusCode).send(product);
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
            const productId = req.params.id;
            const userId=req.user
            const product = await productServices.editProduct(productId,userId);
            if (product.error) {
                return res.status(config.badRequestStatusCode).send(product);
            }
             return res.status(config.successStatusCode).send(product);
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
            const id = req.params.id
            const userId=req.user
            const body=req.body;
            const requestParams = {
                "category_id": body.category_id,
                "name": body.name,
                "description":body.description,
            };
            const product = await productServices.updateProduct(id, requestParams,userId);
            if (product.error) {
                return res.status(config.badRequestStatusCode).send(product);
            }
            return res.status(config.successStatusCode).send(product)
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
            const userId=req.user
            const product = await productServices.deleteProduct(productId,userId);
            if (product.error) {
                 return res.status(config.badRequestStatusCode).send(product);
            }
             return res.status(config.successStatusCode).send(product);
        } catch (err) {
             logger.error({ error_message: err.message });
            return res.status(config.internalServerErrorStatusCode).send({ error_message: err.message });
        }
    }

}

module.exports = productController;