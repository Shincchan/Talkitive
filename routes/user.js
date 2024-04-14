const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authorization = require('../middleware/authorization');

router.get('/users',authorization,async(req,res)=>{
    try{
        const users = await User.find({_id : {$ne : req.user._id}});
        
        return res.status(201).json({users:users});
    }catch(error){
        console.log(error);
        return res.status(505).json({error : "Internal Server Error"});
    }
})




module.exports = router;