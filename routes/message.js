const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const Conversation = require('../models/conversations');
const authorization = require('../middleware/authorization');
const User = require('../models/user');
const {getReceiverSocketId,io} = require('../socket/socket');
router.post('/message/send/:id',authorization, async(req,res)=>{
try {
    const receiverId = req.params.id;
    const senderId = req.user._id;
    const content = req.body.message;
    let convo = await Conversation.findOne({participants : {$all : [senderId,receiverId] } });
    
    if(!convo){
        convo = await Conversation.create({
            participants : [senderId,receiverId],
        });
    }
    const newMessage = await new Message({
        senderId,
        receiverId,
        content
    })
    
    if(newMessage){
        
        convo.messages.push(newMessage._id);
    }
    await Promise.all([convo.save(),newMessage.save()]);
   
    const receiverSocketId  = getReceiverSocketId(receiverId);
    
    if(receiverSocketId){
        console.log(receiverSocketId);  
            io.to(receiverSocketId).emit("newMessage",newMessage)  
    }

    return res.status(200).json({message : newMessage});
}catch(error){
        console.log(error);
        return res.status(500).json({err : "Internal Server Error"});
    }

});


router.get('/message/:id',authorization, async(req,res)=>{
    try {
    const receiverId = req.params.id;
    const senderId = req.user._id;
    let user2 = await User.findOne({_id : receiverId});
    if(!user2 || user2 == senderId ) return res.status(404).json({err : "user not found"});
    let convo = await Conversation.findOne({participants : {$all : [senderId,receiverId] } }).populate('messages');
    
    let x = [];
    if(convo ) x = convo.messages;

    return res.status(200).json({messages : x});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({err : "Internal Server Error"});
    }

});




module.exports  = router;