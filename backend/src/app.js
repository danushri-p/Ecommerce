
const express = require('express');
const userRouter = require('./routes/user.route.js');


if(process.env.NODE_ENV!=='PRODUCTION'){
    require('dotenv').config({
        path:'./src/config/.env',
    });
}




const app=express()

app.get('/',(req,res)=>{
    return res.send("Welcome to backend")
})

app.use('/user', userRouter);

module.exports=app;
const express= require('express');
const app=express()
const userRouter=
app.get('/',(req,res)=>{
    return res.send("Welcome to backend")
})
app.use
module.exports=app;

