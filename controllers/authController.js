
const {promisify } = require('util') // jwt promise function
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
require('dotenv').config();
const AppError = require('./../utils/appError')


const signToken = id =>{
  return jwt.sign({ id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}


exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create( req.body
    // name: req.body.name,
    // email: req.body.email,
    // password: req.body.password,
    // passwordConfirm: req.body.passwordConfirm,
    // passwordChangedAt: req.body.passwordChangedAt
  );
    const token = signToken(newUser.id)
  // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
  //   expiresIn: process.env.JWT_EXPIRES_IN,
  // });

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
    if (!user || !(await user.correctPassword(password, user.password))){
      return next(new AppError('Incorrect email or pasword', 401))
  
    }


    // 3) if everything ok, send token to client
    const token =  signToken(user.id)

    res.status(200).json({
        status: 'success',
        token,
        // data: {
        //     user
        // }
    })

})


exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    // console.log(token)
  }

  if(!token){

    return next(new AppError('You are not logged in!, please log in  to get access'))
  };

  
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);



  // 3) Check it user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser){
    return next(new AppError("The user belonging to this token does not longer exist", 401))
  }



  // 4) check if user changed password after the token was issued
if (currentUser.changePasswordAfter(decoded.iat)) {
  return next(
    new AppError('User recently changed password! Please log in again.', 401)
  );
}

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
})


exports.restrictTo =(...roles) =>{
  return (req, res, next) =>{
    // roles [ 'admin' , 'lead-guide']. role='user'
    if(!roles.includes(req.user.role)){
      return next(new AppError('You do not have permission to perform this aciton', 403))
    }
    next()
  };
};


exports.forgetPassword = (req,res,next) =>{
  // 1) Get user based on posted email

  const user = await Usr.findOne({email:})



  //2) Generate teh random reset token


  //3) sent it to user's email

}

exports.resetPassword =(req,res,next) =>{

}



