const router = require('express').Router();
const taskController = require('../../controllers/taskController');

router.get(
    '/tasks',(req,res)=>{
        taskController.getTaskList(req,res);
    }
    
);

router.get(
    '/tasks/:id',(req,res)=>{
        taskController.getTaskByID(req,res);
    }
    
);

router.post(
    '/task',(req,res)=>{
        taskController.createTask(req,res);
    }
    
);

router.patch(
    '/task/:id',(req,res)=>{
        taskController.updateTask(req,res);
    }
    
);

router.delete(
    '/task',(req,res)=>{
        taskController.deleteTask(req,res);
    }
);

module.exports = router;