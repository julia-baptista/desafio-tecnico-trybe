const { createTaskModel, getDateModel } = require('../models/modelCreateTask');

const validateName = (name) => {
  if ( !name || typeof name !== 'string') {
    const error = { 
      status: 422,
      code: 'invalid_data',
      message: '"task" must have a name',
    };
    throw error;
  }
};

const validateStatus = (status) => {
  const statusList = ['pendente', 'em andamento', 'pronto'];
  if ( !status ||  statusList.indexOf(status) < 0) {
    const error = { 
      status: 422,
      code: 'invalid_data',
      message: '"task" must have a name',
    };
    throw error;
  }
};


const createTaskService = async (name, status) => {
  // validateName(name);
  // validateStatus(status);
  const newTaskId = await createTaskModel(name, status);
  const { createdAt } = await getDateModel(newTaskId);
  const newTask = {
    _id: newTaskId,
    name,
    status,
    createdAt,
  };
  return newTask;
};

module.exports = {
  createTaskService
}