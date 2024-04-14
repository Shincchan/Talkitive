const mongoose = require('mongoose');
const {ObjectId} =  mongoose.Schema.Types

const message = mongoose.Schema({
    senderId : {  type :ObjectId,
                ref : "User",
                required : true
            },
    receiverId :{
        type :ObjectId,
        ref : "User",
        required : true
    },
    content : {
        type : String,
        required : true
    }
},{timestamps:true});

const Message =  mongoose.model('Message',message);
module.exports = Message;