const { getTaskByIdModel } = require('../models/modelDeletetask');
const { updateTaskModel } = require('../models/modelUpdateTask')

const updateTaskService = async (id, name, status) => {
  const task = await getTaskByIdModel(id);
  const error = { 
    status: 422,
    code: 'invalid_data',
    message: 'Task does not exist',
  };
  if (!task) throw error;
  await updateTaskModel(id, name, status);
};

module.exports = {
  updateTaskService,
}