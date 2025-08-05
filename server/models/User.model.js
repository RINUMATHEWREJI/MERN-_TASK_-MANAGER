const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps:true,versionKey:false});

UserSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});

UserSchema.methods.comparePassword = function (candidatepassword){
    return bcrypt.compare(candidatepassword,this.password);
};

module.exports = mongoose.model('User',UserSchema);