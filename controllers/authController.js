const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
require('dotenv').config();
const AppError = require('./../utils/appError')


exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});


exports.login =  catchAsync(async (req,res, next) =>{
    const {email, password} = req.body;

    // 1) Check if email and password exist

    if(!email || !password){
        next(new AppError('Please email and password!', 400))

    }

    // 2) Check if user exists && password is correct
    const user =  await User.findOne({email}).select('+password')
    const correct = user.correctPassword(password, user.password);

    if (!user || !correct){
        return next(new AppError('Incorrect email or pasword', 401))
    }


    // if everything ok, send token to client

    token = '';
    res.status(200).json({
        status: 'success',
    })

})



