const jwt =require('jsonwebtoken');
const mongoose =  require('mongoose');

const User = require('../models/user');
module.exports = (req,res,next) => {
    
    const Authorization = req.headers.authorization;
    console.log(req.headers);
    if(!Authorization){
        
       return res.status(401).json({error : "you must be logged in"})
    }
    else{
        
        const token = Authorization.replace("Bearer ","");
        jwt.verify(token,process.env.JWT_SECRET,(err,payload) => {
            if(err){
               return  res.status(401).json({error : "you must be logged in "});
            }else{
                const {_id} = payload;
                User.findById(_id).select('-password -gender').then(userdata=>{
                    req.user = userdata;
                    console.log(userdata);
                    next();

                })
            }
        })

    }
}