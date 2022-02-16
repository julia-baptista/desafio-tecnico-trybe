const connection = require('./connection');

const getTaskListModel = async () => {
  const conn = await connection();
  const tasks = await conn.collection('tasks').find({}).toArray();
  return tasks;
};

module.exports = {
  getTaskListModel
};