const mongoose = require('mongoose');
const {ObjectId} =  mongoose.Schema.Types

const conversation = mongoose.Schema({
    participants : [{  type :ObjectId,
                ref : "User",
            }],
    messages : [{
        type : ObjectId,
        ref : "Message",
        default : [],
    }]
},{timestamps:true});

const Conversation = mongoose.model('Conversation',conversation);
module.exports = Conversation; 