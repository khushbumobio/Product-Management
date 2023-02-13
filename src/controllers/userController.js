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
            const userRole=req.user.role;
            const body=req.body;
            const requestParams = {
                "name": body.name,
                "email": body.email,
                "password": await bcrypt.hash(body.password, 10),
                "phone_number": body.phone_number,
                "address": body.address,
                "role": body.role.toLowerCase(),
                "merchent_type": body.merchent_type,
            };
           const password=body.password;
            const userData = await userService.createUser(userRole,requestParams,password);
            if (userData.error) {
                return res.status(config.badRequestStatusCode).send(userData);
            }
             return res.status(config.successStatusCode).send(userData);
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
            const query=req.query;
            const requestQueries = {
                "limit": query.limit,
                "page": query.page,
                "sort": query.sort,
                "sortingMethod": query.orderby,
                "key": query.search,
            }
            const userData = await userService.listUser(requestQueries);
            if (userData.error) {
                 return res.status(config.badRequestStatusCode).send(userData);
            }
            return res.status(config.successStatusCode).send(userData);
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
            const userData = await userService.editUser(userId);
            if (userData.error) {
                return res.status(config.badRequestStatusCode).send(userData);
            }
             return res.status(config.successStatusCode).send(userData);
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
            const body=req.body;
            const requestParams = {
                "name": body.name,
                "phone_number": body.phone_number,
                "address": body.address,
                "role": body.role,
                "merchent_type": body.merchent_type,
            };
            const id = req.params.id
            const userData = await userService.updateUser(id, requestParams);
            if (userData.error) {
                return res.status(config.badRequestStatusCode).send(userData);
            }
            return res.status(config.successStatusCode).send(userData)
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
            const userData = await userService.deleteUser(userId,req.user.role);
            if (userData.error) {
                 return res.status(config.badRequestStatusCode).send(userData);
            }
             return res.status(config.successStatusCode).send(userData);
        } catch (err) {
             logger.error({ error_message: err.message });
            return res.status(config.internalServerErrorStatusCode).send({ error_message: err.message });
        }
    }

}

module.exports = userController;