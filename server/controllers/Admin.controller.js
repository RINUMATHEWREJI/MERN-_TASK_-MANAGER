const User = require('../models/User.model');
const Task = require('../models/Task.model');

const getAllUsers = async (req, res) => {
try {
    const users = await User.find().select('-password'); // hide hashed passwords
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const getUserTasks = async (req,res)=>{
    try{
        const tasks = await Task.find({user:req.params.userId});
        return res.status(200).json({tasks}); 
    }
    catch(error){
        console.log("error: ",error.message);
        return res.status(400).json({error:"error fetching tasks"});
    }
};

const deleteUser = async (req,res)=>{
    try{
        await Task.deleteMany({user:req.params.userId});
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({message:"user and their task deleted"});
    }
    catch(error){
        console.log("error: ",error.message);
        return res.status(400).json({error:"error deleteing user"});
    }
};

module.exports = {getAllUsers,getUserTasks,deleteUser};