let tasks = [
    {id:1,name:'complete assignments',isComplete:false},
    {id:2,name:'complete projects',isComplete:false},
    {id:3,name:'complete aca syllabus',isComplete:false},
];
let id=4;

const getTaskList = (isComplete)=>{
    console.log(isComplete);
    if(isComplete===undefined){
        return tasks;
    }
    isComplete = isComplete === 'true';
    const getIsCompletetasks = tasks.filter(task => task.isComplete === isComplete);
    return getIsCompletetasks;
    
};

const getTaskByID = (taskId)=>{
    taskId = Number(taskId);
    const task = tasks.find(task => task.id === taskId);
    return task;
};

const createTask =  (task)=>{

    tasks.push({name:task.name,id,isComplete:false});
    id+=1;
    return tasks.find(task => task.id === id-1);
};

const updateTask =  (taskId)=>{
    taskId = Number(taskId);
    const task = tasks.find(task => task.id === taskId);
    task['isComplete']=!task['isComplete'];
    return task;
};


const deleteTask =  (isComplete)=>{
   
    isComplete = isComplete === 'true';
    tasks = tasks.filter(task => task.isComplete !== isComplete);
    return tasks;
};


module.exports = { getTaskList, getTaskByID, createTask, updateTask, deleteTask };
