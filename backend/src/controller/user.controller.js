const ErrorHandler = require ('../utlis/ErrorHandler'); 
const model = require('../models/user.model');

export async function CreateUser(req,res){
    const {Name, email, password} = req.body;

    const CheckUserPresent = await model.findOne({
        email: email,
    });
    if (CheckUserPresent) {
        return new ErrorHandler('Already Present in DB', 400);
    }
    const newUser = new model({
        Name: Name,
        email: email,
        password: password,
    });
    await newUser.save();
    return res.send('User created Successfully');
}