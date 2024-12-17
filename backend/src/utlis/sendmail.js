const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
      user: 'danushri.prakash@gmail.com',
      pass: 'ahgr pwuw rfkv svxw',
    },
  });
  
  module.exports = transporter;