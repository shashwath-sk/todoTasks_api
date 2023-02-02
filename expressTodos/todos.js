const express = require('express');
const app = express();
const port = 2400;
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

let tasks = [
    {id:1,name:'complete assignments',isCompleted:false},
    {id:2,name:'complete projects',isCompleted:false},
    {id:3,name:'complete aca syllabus',isCompleted:false},
];
let id=4;

app.get('/tasks',(req,res)=>{    
    res.send(tasks);
});
app.get('/tasks/completed',(req,res)=>{
    const completedTask = tasks.filter(task=> task.isCompleted===true);
    res.send(completedTask);
});
app.get('/tasks/active',(req,res)=>{
    const todoTask = tasks.filter(task=> task.isCompleted!=true);
    res.send(todoTask);
});
app.get('/tasks/:id',(req,res)=>{
    const getTask = tasks.filter(task=> task.id == req.params['id'] );
    res.send(getTask);
});

app.post('/task',(req,res)=>{
    const task = req.body;
    task['id'] = id;
    id+=1;
    task['isComplete'] = false;
    tasks.push(task);
    res.send(tasks);
});

app.patch('/task/:id' ,(req,res)=>{
    tasks = tasks.map(task=>{
        task.isCompleted = task.id==req.params['id']?true:task.isCompleted;
        return task;
    });
    res.send(tasks);
});

app.delete('/task',(req,res)=>{
    let completed = Boolean(req.query.isComplete);
    const todoTask = tasks.filter(task=> task.isCompleted!=completed); 
    res.send(todoTask);
});

app.listen(port,()=>
{
    console.log(`server listening at port ${port}`);
});