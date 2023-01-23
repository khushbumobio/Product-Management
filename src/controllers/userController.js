const userService = require('../services/userServices')
const bcrypt = require('bcrypt');
const config = require('../config/config');
const logger = require('../logger/logger')

class userController {
    /**
     * create user
     * @param {Request} req
     * @param {JSON} res
     * @returns
     * @author khushbuw
     */
    static async createUser(req, res) {
        try {
            // return res.send('hi')
            const userRole=req.user.role
            const requestParams = {
                "name": req.body.name,
                "email": req.body.email,
                "password": await bcrypt.hash(req.body.password, 10),
                "phone_number": req.body.phone_number,
                "address": req.body.address,
                "role": req.body.role,
                "merchent_type": req.body.merchent_type,
            };
           const password=req.body.password;
            const data = await userService.createUser(userRole,requestParams,password);
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
         * list of users
         * @param {Request} req
         * @param {JSON} res
         * @returns
         * @author khushbuw
         */
    static async listUser(req, res) {
        try {
            const requestQueries = {
                "limit": req.query.limit,
                "page": req.query.page,
                "sort": req.query.sort,
                "sortingMethod": req.query.orderby,
                "key": req.query.search,
            }
            const data = await userService.listUser(requestQueries);
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
     * edit user
     * @param {Request} req
     * @param {JSON} res
     * @returns
     * @author khushbuw
     */
    static async editUser(req, res) {
        try {
            const userId = req.params.id;
            const data = await userService.editUser(userId);
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
     * update users
     * @param {Request} req
     * @param {JSON} res
     * @returns
     * @author khushbuw
     */
     static async updateUser(req, res) {
        try {
            const requestParams = {
                "name": req.body.name,
                "phone_number": req.body.phone_number,
                "address": req.body.address,
                "role": req.body.role,
                "merchent_type": req.body.merchent_type,
            };
            const id = req.params.id
            const data = await userService.updateUser(id, requestParams);
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
     * delete user
     * @param {Request} req
     * @param {JSON} res
     * @returns
     * @author khushbuw
     */
    static async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const data = await userService.deleteUser(userId);
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

module.exports = userController;