const express = require('express');
const path = require('path')
const {app,server} = require('./socket/socket');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 8000;
const cors = require('cors')
app.use(cors())
const __dirnamee = path.resolve();
dotenv.config();
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


app.use(express.static(path.join(__dirnamee,"client/dist")))
   
    app.get("*",(req,res)=>{
        
        res.sendFile(path.join(__dirnamee,'client','dist','index.html'))})


server.listen(PORT,()=>{
    console.log(`app is running on ${PORT}`);
});

