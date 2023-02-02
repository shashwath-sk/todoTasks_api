const http = require('http');
const PORT =  5000;
const url = require('url');

let db = [];
let id = 0;

const server = http.createServer((req, res) => {

    const query = url.parse(req.url,true);
    

    if(req.method === 'GET' && req.url === '/tasks') {

        res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(db));
    }

    else if(req.method === 'GET' && req.url=='/tasks/active')
    {
        const tasks = db.filter(todoTask=> todoTask.isComplete===false );
        res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(tasks));

    }
    else if(req.method === 'GET' && req.url=='/tasks/complete')
    {
        const tasks = db.filter(todoTask=> todoTask.isComplete===true );
        res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(tasks));

    }

    else if(req.method === 'GET' && query.path.match(/^\/tasks\/\d$/)) {
        const _id = parseInt(query.pathname.split('/')[2]);

        const task = db.filter(todoTask => todoTask.id===_id);
        res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(task));
    }
    else if(req.method === 'DELETE' && query.pathname.match(/^\/tasks\?isComplete=true$/) ) {
        // const _id = parseInt(query.pathname.split('/')[2])
        console.log('dddd');
        const task = db.filter(todoTask => todoTask.isComplete !== true);
        res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(task));
    }

    else if(req.method === 'PATCH' && query.path.match(/^\/tasks\/\d$/)) {
        const _id = parseInt(query.pathname.split('/')[2]);

        db = db.map(todoTask => {
            todoTask.isComplete = todoTask.id===_id;
            return todoTask;
        });

        res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(db));
    }


    else if(req.method === 'POST' && req.url === '/tasks') {
      
        let body = '';
        req.on('data', chunk => {
            
            body+= chunk.toString();
        });
        req.on('end', ()=> {
           
            
            body = JSON.parse(body);
            body.id = id;
            id+=1;
            body.isComplete = false;
            db.push(body);
            res.writeHead(200,{'Content-Type': 'application/json'});
            res.end(JSON.stringify(body));
        });
       
    }
    else
    {
        console.log(query.path);
        console.log(query.search);
        res.end('done');
    }

});

server.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});




