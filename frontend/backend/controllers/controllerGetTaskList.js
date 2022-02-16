const { getTaskListService } = require('../services/serviceGetTaskList');

const getTaskList = async (req, res, next) => {
  try {
    const taskList = await getTaskListService();
    return res.status(200).json({taskList});
  } catch (error) {
    console.error(error.message);
    return next(error);
  }  
};

module.exports = {
  getTaskList
}