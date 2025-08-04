const mongoose = require('mongoose');

const TaskShema = new mongoose.Schema(
    {
        title : {
            type:String,
            required:true,

        },
        description : {
            type:String
        },
        completed : {
            type: Boolean,
            default: false
        },
    },
    {timestamps:true,versionKey:false}
);

module.exports = mongoose.model('Task',TaskShema);