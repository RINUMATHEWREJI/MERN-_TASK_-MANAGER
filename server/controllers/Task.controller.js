const TaskModel = require('../models/Task.model');

const getTask = async(req,res)=>{
    try{
        const tasks = await TaskModel.find();
        return res.status(200).json(tasks);
    }
    catch(error){
        return res.status(400).json({error:"no data found"});
    }
};
const createTask = async(req,res)=>{
    try{
        const task = await TaskModel.create(req.body);
        return res.status(201).json(task);
    }
    catch(error){
        return res.status(400).json({error:"invalid data"});

    }
};
const updateTask = async(req,res)=>{
    try{
        const {id} = req.params;
        const task = await TaskModel.findByIdAndUpdate(id,req.body,{new:true});
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
        const task = await TaskModel.findByIdAndDelete(id);
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