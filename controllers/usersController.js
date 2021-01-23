const User = require('../models/Users');
const Bookmarks = require("../models/Bookmarks");
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.getUsers = async(req,res)=>{
    await User
    .find()
    .sort({createdAt: -1})
    .then( users => res.json(users))
}

/* exports.findUser = async (req,res)=>{
    const {userNameOrEmail} = req.body;
    try {
       const findUser = await User.findOne({username: userNameOrEmail}) || await User.findOne({email: userNameOrEmail})
       if(!findUser){
           return res.status(400).json({error: "User not found"})
       }
       res.json(findUser)

    } catch (error) {
        console.log(error.message)
    }
} */

exports.userBookmarks = async(req,res)=>{
    const userId = req.user;
    await Bookmarks.find({userId:userId})
    .then((result)=>res.json(result))
}

exports.userSignup = (req,res)=>{
    let {email,username,password} = req.body;
    if(!username){
        username = email;
    }
    const newUser = new User({
        username,
        email,
        password
    })
    newUser
    .hashPassword()
    newUser.save()
    .then( user => res.json(user))
    
}

exports.userLogin = async(req,res)=>{
    const userFounded = req.userFounded;

   await bcrypt.compare(req.body.password, userFounded.password)
    .then(isMatch => {
        if(!isMatch){
            return res.status(400).json({error: "Wrong password"})
        }
        const token = jwt.sign({_id: userFounded._id},process.env.JWT_SECRET);
        res.json({
            token: token,
            _id: userFounded._id,
            username: userFounded.username,
            email: userFounded.email,
            createdAt: userFounded.createdAt,
            updatedAt: userFounded.updatedAt
        })
    }).catch(err => err.message)
}

exports.deleteUser = async(req,res)=>{
    
    const deleteUserId = req.params._id;
    const checkAdmin = await User.findById(req.user).then( user => user.role === "Admin")
    if(!checkAdmin){
        return res.status(500).json({error:"Action not permitted"})
    }
    await Bookmarks.find({userId :deleteUserId })
    .deleteMany()
    .then(async()=>await User.findByIdAndRemove(deleteUserId))
 
}

exports.uploadAvatar = async(req,res)=>{

    try {
        const user = await User.findById(req.params._id);
        if (!user) {
            res.status(400).json({error: "User not found"})
          }
          
        Object.assign(user, req.body);
        // URL format we want to create: http://localhost:5000/avatars/${req.file.filename}
        // Multer will store an uploaded and parsed file in object: req.file
        if (req.file) {
            const urlAvatar = `${req.protocol}://${req.get(
              'host'
            )}/avatars/${req.file.filename}`;
            user.avatar = urlAvatar;
          }
          user = await user.save();
    } catch (error) {
        console.log(error.message)
    } 
}