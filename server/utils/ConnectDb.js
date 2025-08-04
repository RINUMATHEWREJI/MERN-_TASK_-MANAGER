const mongoose = require('mongoose');

const ConnectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb connected");

    }
    catch(error){
        console.log("connection failed: ",error.message);
        throw error;

    }
};

module.exports = {ConnectDb};