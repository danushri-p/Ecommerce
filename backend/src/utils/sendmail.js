const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
    user: 'naayaankumar@gmail.com',
    pass: 'nuxl sjhn bmwy qfmu',
  },
});

module.exports = transporter;
