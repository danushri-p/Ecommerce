const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    Name: {type: String, require:[true, 'Please Enter the Name...']},
    email: {
        type: String, 
        require: [true, 'Please Enter Email...'],
        unique:[true, 'Please enter unique email address'],
    },
    password: {type: String, require: [true, 'please enter Password...']},
    address: [
        {city: String},
        {country: String},
        {add1: String},
        {add2: String},
        {zipCode: String},
        {addressType: String},
    ],
    role:{
        type: String,
        default: 'user',
    },
    avatar:{
        url: {type: String, require: true},
        public_id: {type: String, require: true}
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
},
{ versionKey: false }
);
const model = mongoose.model('user', userSchema);

module.exports =  model;