const taskService = require('../services/taskService');

const getTaskList =  (req,res)=>{
    const tasks =  taskService.getTaskList(req.query.isComplete);
    if(!tasks){
        res.status(404).json({message: 'No tasks found'});
    }
    res.status(200).json(tasks);
};

const getTaskByID =  (req,res)=>{

    const task =  taskService.getTaskByID(req.params.id);
    if(!task){
        res.status(404).json({message: 'No tasks found'});
    }
    res.status(200).json(task);
};

const createTask =  (req,res)=>{

    if(req.body.name === undefined){
        res.status(400).json({message: 'Name is required'});
    }
    const tasks =  taskService.createTask(req.body);
    res.status(201).json(tasks);

};

const updateTask =  (req,res)=>{
    if(!isNaN(req.body.id)){
        res.status(400).json({message: 'Id should be Integer'});
    }
    const task =  taskService.updateTask(req.params.id);
    res.status(200).json(task);
};


const deleteTask =  (req,res)=>{
    const tasks =  taskService.deleteTask(req.query.isComplete);
    res.status(200).json(tasks);
};


module.exports = { getTaskList, getTaskByID, createTask, updateTask, deleteTask };