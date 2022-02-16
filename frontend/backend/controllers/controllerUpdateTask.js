const { updateTaskService } = require('../services/serviceUpdateTask');


const updateTask = async (req, res, next) => {
  try {
    const { name, status } = req.body;
    const { id } = req.params;
    await updateTaskService(id, name, status);
    return res.status(201).send('Updated');
  } catch (error) {
    console.error('controler erro: ', error);
    return next(error);
  }  
};

module.exports = {
  updateTask,
};