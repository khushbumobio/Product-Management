const nodemailer = require("nodemailer");
const config = require("../config/config.js")
const logger = require('../logger/logger')


/**
 * send email & password to customers
 * @param name
 * @param email
 * @param password
 * @author khushbuw
 */
const sendMail = async(name, email, password) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: email,
                pass: password
            },
        });
        await transporter.sendMail({
            from: config.emailUser,
            to: email,
            subject: "Customer Authentication Details",
            html: config.greetings + name + '<p>Welcome in Product Management System \n Your Email Id :' +
            email + '\n Your password: ' + password  + '\n Thank You, \n Product Management SYstem</p>'
        });
        logger.info("success: ", "email send")
    } catch (error) {
        logger.error({ error_message: error.message });
        return ["error: ", error.message];
    }
  };

  module.exports = {sendMail}
  