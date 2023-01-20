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