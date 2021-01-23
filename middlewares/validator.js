const { validationResult } = require('express-validator');
const User = require('../models/Users');


exports.userRegValidator =async (req,res,next)=>{
   let { email, password, username, confirmPassword} = req.body;

   if(!email || !password || !confirmPassword){
       return res.status(400).json({error: "Empty fields"})
   }
   if(password.length <=5){
    return res.status(400).json({error: "The password must be at least 6 characters"})
   }
   if (password !== confirmPassword) {
       return res.status(400).json({error: "Enter the same password for the validation"})
   }
   if (!isNaN(password)){
    return res.status(400).json({error: "The password must include letters"})
   }
   let counter = 0;
   for(let i= 0; i<= password.length; i++){
       if(!isNaN(password[i])){
            counter += +password[i]
       }
   }
   if(counter == 0){
    return res.status(400).json({error: "The password must include numbers"})
   }
   const checkUsername = await User.findOne({username});
   const checkEmail = await User.findOne({email});
   if(checkUsername){
       return res.status(400).json({error: "Username already taken"})
   }
   if(checkEmail){
       return res.status(400).json({error: "Email already registered"})
   }
   
   next()
}

exports.userLoginValidator = async (req,res,next)=>{
    const {userNameOrEmail, password} = req.body;
    if(!userNameOrEmail || !password){
        return res.status(400).json({error: "Enter your Username/Email and password to login"})
    }
    const findUser = await User.findOne({username: userNameOrEmail}) || await User.findOne({email: userNameOrEmail});
    if(!findUser){
         return res.status(400).json({error: "Ooops! You are not registered :/"})
    }
    req.userFounded = findUser
    next()
}

