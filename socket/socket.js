const http = require('http');
const express = require('express');
const app = express();


const server = http.createServer(app);
const {Server} = require('socket.io');

const io = new Server(server,{
    cors :{
        origin :"*"
    }
}
);

const userSocketMap = {};   

io.on('connection',(socket)=>{
    console.log("a user connnected", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId != "undefined"){
            userSocketMap[userId] = socket.id;
    }

    io.emit('getOnlineUsers',Object.keys(userSocketMap));

    socket.on("disconnect", (socket)=>{
        console.log(socket.id);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers',Object.keys(userSocketMap));
    }); 

})


const getReceiverSocketId = (receiverId)=>{
    return userSocketMap[receiverId];
}

module.exports = {io,app,server,getReceiverSocketId};
