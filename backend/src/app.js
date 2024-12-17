const express = require('express');
const userRouter = require('./routes/user.route.js');

if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({
    path: './src/config/.env',
  });
}

const app = express();
// M6
app.use(express.json());

app.get('/', (req, res) => {
  return res.send('Welcome to backend');
});

app.use('/user', userRouter);

// connecting the database and running the server
module.exports = app;