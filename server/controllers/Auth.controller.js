const jwt = require('jsonwebtoken');
const UserModel = require('../models/User.model');

const JWT_SECRET = process.env.SECRET_KEY;

const signup = async(req,res)=>{

    try{
        const user = new UserModel(req.body);
        await user.save()
        return res.status(201).json({token});
    }
    catch(error){
        console.log("error: ",error.message);
        return res.status(400).json({error:'signup failed'});
    }
};

const login = async(req,res)=>{

    try{
        const user = await UserModel.findOne({email:req.body.email});
        if(!user || !(await user.comparePassword(req.body.password))){
            return res.status(401).json({error:'invalid credentials'});
        }
        const token = jwt.sign({userId:user._id,role:user.role},JWT_SECRET,{expiresIn:'1d'});
        return res.status(200).json({token});

    }
    catch(error){
        console.log("error: ",error.message);
        return res.status(400).json({error:'login failed'});
    }
};





module.exports = {signup,login};