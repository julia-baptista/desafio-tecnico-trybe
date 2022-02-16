const { deleteTaskModel, getTaskByIdModel } = require('../models/modelDeletetask');

const deleteTaskService = async (id) => {
  const task = await getTaskByIdModel(id);
  const error = { 
    status: 422,
    code: 'invalid_data',
    message: 'Wrong sale ID format',
  };
  if (!task) throw error;
  await deleteTaskModel(id);
};

module.exports = {
  deleteTaskService,
}