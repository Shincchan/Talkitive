const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt =require('bcryptjs'); 
const jwt = require('jsonwebtoken');
router.post("/signup",async (req,res)=>{
    try {const {username,password,gender} = req.body;
    let user = await(User.findOne({username}));
    if(user){
        console.log("already exists");
        return res.status(422).json({error: "username already exists"});

    }else if( !password){
       return res.status(422).json({error: "Password shall have more than 6 characters"});
    }
    else{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new User({
            username,
            password : hashedPassword,
            gender,
            profilePic : (gender == "male" ? `https://avatar.iran.liara.run/public/boy?username=${username}` : `https://avatar.iran.liara.run/public/girl?username=${username}`),
        })
        await user.save();
        console.log(user);
        return res.status(200).json({message : "signedin"});
    }
    
    }catch(error){
        console.log(error);
        return res.status(500).json({err: "server error"});
    }
    
    
});

router.post('/login',async (req,res)=>{
    console.log("ok");
    const {username,password} = req.body;

    try {
        if(!username || !password){
            res.status(422).json({error : "please add email or password"});
        }
        const user = await User.findOne({username:username});
        
        if(!user){
            return res.status(404).json({error :"invalid credentials"})
        }else{
            const validPassword = await bcrypt.compare(
                password,
                user.password
              );
              if (!validPassword) {
                 return res.status(400).json({error : "invalid credentials"});
              } else {

                const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
                const {_id,username,profilePic} = user;

                res.status(200).json({token,user:{_id,username,profilePic}});
              }
        }


    } catch (error) {
       console.log(error);
    }
    
})


module.exports = router;