const jwt = require('jsonwebtoken');
const User = require('../models/Users');

exports.auth = async (req,res,next)=>{

    try {
        const token = await req.header("x-auth-token");
        if(!token){
            return res.status(401).json({error:"Access denied, token not signed"})
        }
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET);
        if(!verifyToken){
            return res.status(401).json({error:"Token verification failed"})
        }
        req.user = verifyToken._id

        next()

    } catch(err) {
        res.status(400).json({error: "token not valid"})
    }
   
}