var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'khushbu.waghela@mobiosolutions.com',
    pass: 'leyhzrygridlgtel'
  }
});

var mailOptions = {
  from: 'khushbu.waghela@mobiosolutions.com',
  to: 'khushbu.waghela@mobiosolutions.com',
  subject: 'Sending Email using Node.js',
  html: '<h1>Hi Khushi</h1><p>Your Messsage</p>'        
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});