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
            const authData = await authService.login(requestParams);
            if (authData.error) {
                return res.status(config.succesbadRequestStatusCodesStatusCode).send(authData);
            }
            return res.status(config.successStatusCode).send(authData)
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
            const authData = await authService.profile(user);
            if (authData.error) {
                return res.status(config.badRequestStatusCode).send(authData);
            }
            return res.status(config.successStatusCode).send(authData)
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
            const authData = await authService.updateProfile(id, requestParams);
            if (authData.error) {
                return res.status(config.badRequestStatusCode).send(authData);
            }
            return res.status(config.successStatusCode).send(authData)
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
            const authData = await authService.updateProfile(id, requestParams);
            if (authData.error) {
                return res.status(config.successStbadRequestStatusCodeatusCode).send(authData);
            }
            return res.status(config.successStatusCode).send(authData)
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
            const userRole = req.user.role
            const authData = await authService.generatePassword(id, requestParams, userRole);
            if (authData.error) {
                return res.status(config.badRequestStatusCode).send(authData);
            }
            return res.status(config.successStatusCode).send(authData)

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
            const authData = await authService.logOut(user);
            if (authData.error) {
                return res.status(config.badRequestStatusCode).send(authData);
            }
            return res.status(config.successStatusCode).send(authData)
        } catch (err) {
            logger.error({ error_message: err.message });
            return res.status(config.internalServerErrorStatusCode).send({ error_message: err.message });
        }
    }

}
module.exports = authController;
