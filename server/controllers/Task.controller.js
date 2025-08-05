const TaskModel = require('../models/Task.model');

const getTask = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await TaskModel.countDocuments({user:req.userId});
    const tasks = await TaskModel.find({user:req.userId})
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // optional: newest tasks first

    return res.status(200).json({
      tasks,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return res.status(400).json({ error: "No data found" });
  }
};

const createTask = async(req,res)=>{
    try{
        const task = await TaskModel.create({...req.body,user:req.userId});
        return res.status(201).json(task);
    }
    catch(error){
        return res.status(400).json({error:"invalid data"});

    }
};
const updateTask = async(req,res)=>{
    try{
        const {id} = req.params;
        const task = await TaskModel.findByIdAndUpdate({ _id: id, user: req.userId },req.body,{new:true});
        if (!task){
            return res.status(404).json({error:"task not found"});
        }
        return res.status(200).json(task);
    }
    catch(error){
        return res.status(400).json({error:"update failed"});
    }
};
const deleteTask = async(req,res)=>{
    try{
        const {id} = req.params;
        const task = await TaskModel.findByIdAndDelete({ _id: id, user: req.userId });
        if(!task){
            return res.status(404).json({error:"task not found"});
        }
        return res.status(200).json(task);
    }
    catch(error){
        return res.status(400).json({error:"delete failed"});
    }
};

module.exports = {getTask,createTask,updateTask,deleteTask};