const { deleteTaskService }= require('../services/serviceDeleteTask');


const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteTaskService(id);
    return res.status(200).send('Deleted');
  } catch (error) {
    console.error(error.message);
    return next(error);
  }  
};

module.exports = {
  deleteTask,
};