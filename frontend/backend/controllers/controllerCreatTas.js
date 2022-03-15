const { createTaskService } = require('../services/serviceCreatTask');


const createTask = async (req, res, next) => {
  try {
    const { name, status } = req.body;
    const newTask = await createTaskService(name, status);
    console.log(newTask);
    return res.status(201).json(newTask);
  } catch (error) {
    console.error('controler erro: ', error);
    return next(error);
  }  
};

module.exports = {
  createTask
};