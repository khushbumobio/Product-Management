const nodemailer = require("nodemailer");
const config = require("../config/config.js")
const logger = require('../logger/logger')


/**
 * send email & password to customers for new generated password
 * @param name
 * @param email
 * @param password
 * @author khushbuw
 */
const generatePasswordMail = async(name, email, password) => {
    try {
      console.log(name)
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: config.emailUser,
              pass: config.emailPassword
            }});
            var mailOptions = {
                from: 'khushbu.waghela@mobiosolutions.com',
                to: email,
                subject: 'generate password',
                html: config.greetings + name + '<p>Welcome back to Product Management,\n your newly generated password: '+password+' \n Thankyou</p>'      
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                    console.log(info);
                }
              });
        
    } catch (error) {
        logger.error({ error_message: error.message });
        return ["error: ", error.message];
    }
  };
  module.exports = {generatePasswordMail}