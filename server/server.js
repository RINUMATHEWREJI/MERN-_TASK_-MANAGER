require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {ConnectDb} = require('./utils/ConnectDb');
const Taskrouter = require('./routers/Task.router');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/tasks',Taskrouter);

app.get('/',(req,res)=>{
    console.log("Api is running");
});

const startServer = async()=>{

    try{
        await ConnectDb();
        const PORT = process.env.PORT || 3000;
        const server = app.listen(PORT,()=>{
            console.log(`server running on port ${PORT}`);
        });
        process.on('SIGINT',async()=>{
            console.log('shutting down..');
            await server.close();
            process.exit(0);
        });
    }
    catch(error){
        console.log("DB connection failed: ",error.message);
        process.exit(1);
    }
};

startServer();