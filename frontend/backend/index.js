const express = require('express');
const { createTask } = require('./controllers/controllerCreatTas');
const { getTaskList } = require('./controllers/controllerGetTaskList');
const { deleteTask } = require('./controllers/controllerDeleteTask');
const cors = require('cors');

const app = express();
const error = require('./middelwares/errorMiddelewares');
const port = 4000;

app.use(express.json());
app.use(cors());

app.post('/task', createTask);
app.get('/task', getTaskList);
app.delete('/task/:id', deleteTask);
// app.put('/task', editTask);


app.use(error);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
