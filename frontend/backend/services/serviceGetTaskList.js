const { getTaskListModel } = require('../models/modelGetTaskList');

const getTaskListService = async () => {
  const tasks = await getTaskListModel();
  return tasks;
};

module.exports = {
  getTaskListService
}