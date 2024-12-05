if (process.env.Node_ENV !== 'PRODUCTION'){
    require('dotenv').config({
        path: '../src/config/.env',
    });
}
const express = require('express');

const app = express();

const userRouter = require


app.get('/', (req, res) => {
    return res.send('Welcome to backend');
});


 module.exports=app;

