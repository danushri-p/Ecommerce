
const ErrorHandler=require('../utilities/ErrorHandler.js')
const UserModel=require('../models/user.model.js');

export async function CreateUser(request,response){
    const{Name,email,password}=request.body;
    const CheckUserPresent=await UserModel.findOne({
        email:email,
    })
    if(CheckUserPresent){
        const error = new ErrorHandler('Aldready present in DB',400);

        return res.status(404).send({
            message: error.message,
            status: error.statusCode,
            success: false,
        });
    }
    const  newUser = new UserModel({
        Name:Name,
        email:email,
        password:password,
    });
    await transporter.sendMail({
        to: 'danushri.saranyaprakash@gmail.com',
        from: 'danushri.prakashsaranya@gmail.com',
        subject: 'verification email from follow aloung project',
        text: 'Text',
        html: '<h1> Hello world http://localhost:5173/activation/{token}</h1>', 
    })
    await UserModel.save();
    return res.send('User created successfully');

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