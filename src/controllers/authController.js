const authService = require('../services/authServices')
const config = require('../config/config');
const logger = require('../logger/logger');

class authController {
    /**
     * This function will login the user
     * @param {Request} req
     * @param {JSON} res
     * @returns
     * @author khushbuw
     */
    static async login(req, res) {
        try {
            const requestParams = {
                "email": req.body.email,
                "password": req.body.password
            }
            // return res.send(requestParams)
            const data = await authService.login(requestParams);
            if (data.error) {
                return res.status(config.successStatusCode).send(data);
            }
            return res.status(config.successStatusCode).send(data)
        } catch (err) {
            logger.error({ error_message: err.message });
            return res.status(config.internalServerErrorStatusCode).send({ error_message: err.message });
        }
    }

    /**
     * profile 
     * @param {Request} req
     * @param {JSON} res
     * @returns
     * @author khushbuw
     */
    static async profile(req, res) {
        try {
            const user = req.user
            const data = await authService.profile(user);
            if (data.error) {
                return res.status(config.successStatusCode).send(data);
            }
            return res.status(config.successStatusCode).send(data)
        } catch (err) {
            logger.error({ error_message: err.message });
            return res.status(config.internalServerErrorStatusCode).send({
                error_message: err.message
            });
        }
    }

    /**
     * update profile 
     * @param {Request} req
     * @param {JSON} res
     * @returns
     * @author khushbuw
     */
    static async updateProfile(req, res) {
        try {
            const requestParams = {
                "name": req.body.name,
                "phone_number": req.body.phone_number,
                "address": req.body.address,
                "role": req.body.role,
                "merchent_type": req.body.merchent_type,
            };
            const id = req.user._id
            const data = await authService.updateProfile(id, requestParams);
            if (data.error) {
                return res.status(config.successStatusCode).send(data);
            }
            return res.status(config.successStatusCode).send(data)
        } catch (err) {
            logger.error({ error_message: err.message });
            return res.status(config.internalServerErrorStatusCode).send({
                error_message: err.message
            });
        }
    }

    /**
         * generate Password 
         * @param {Request} req
         * @param {JSON} res
         * @returns
         * @author khushbuw
         */
    static async generatePassword(req, res) {
        try {
            const requestParams = {
                "password": req.body.password,
                "cpassword": req.body.cpassword,
            };
            const id = req.params.id;
            const data = await authService.generatePassword(id, requestParams);
            if (data.error) {
                return res.status(config.successStatusCode).send(data);
            }
            return res.status(config.successStatusCode).send(data)
        } catch (err) {
            logger.error({ error_message: err.message });
            return res.status(config.internalServerErrorStatusCode).send({ error_message: err.message });
        }
    }


    /**
     * logout user
     * @param {Request} req
     * @param {JSON} res
     * @returns
     * @author khushbuw
     */
    static async logOut(req, res) {
        try {
            const user = req.user
            const data = await authService.logOut(user);
            if (data.error) {
                return res.status(config.successStatusCode).send(data);
            }
            return res.status(config.successStatusCode).send(data)
        } catch (err) {
            logger.error({ error_message: err.message });
            return res.status(config.internalServerErrorStatusCode).send({ error_message: err.message });
        }
    }

}
module.exports = authController;