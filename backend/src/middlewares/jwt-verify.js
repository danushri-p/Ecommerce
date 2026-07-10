const jwt = require('jsonwebtoken');
if (process.env.NODE !== 'PRODUCTION') {
  require('dotenv').config({
    path: './config/.env',
  });
}


const verifyUser = (req, res, next) => {
  const { token } = req.query;
  console.log(req.query);
  if (!token) {
    return res.status(404).send({ message: 'Send token over rqeuest' });
  }

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    console.log(data);
    req.userEmailAddress = data.email;
    req.UserId = data.id;
    //   req.body.userEmailAddress
    next();
  } catch (er) {
    return res.status(401).send({ message: 'Invalid or expired token, please login again', success: false });
  }
};

module.exports = verifyUser;
