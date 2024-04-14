const http = require('http');
const express = require('express');
const {app,server} = require('./socket/socket');
const PORT =  5000;
const dotenv = require("dotenv");
dotenv.config();


const cors = require('cors')

app.use(cors())


const mongoose  = require('mongoose');

app.use(express.json());

mongoose.connect(process.env.MONGOURI);

mongoose.connection.on('connected',()=>{
    console.log('database connected');
});
mongoose.connection.on('error',(err)=>{
    console.log('database not connected',err);
});

app.use(require('./routes/auth'));
app.use(require('./routes/message'));
app.use(require('./routes/user'));


server.listen(PORT,()=>{
    console.log(`app is running on ${PORT}`);
});

