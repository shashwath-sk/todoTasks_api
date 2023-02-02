const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;
const todoRoutes = require('./routes/api/todoRoutes.js');
app.use(bodyParser.json());

app.use('/', todoRoutes);

app.listen(PORT,()=>console.log(`listening on port ${PORT}`));