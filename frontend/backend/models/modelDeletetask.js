const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getTaskByIdModel = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const conn = await connection();
  const task = await conn.collection('tasks').findOne(ObjectId(id));
  return task;
};

const deleteTaskModel = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const conn = await connection();
  await conn.collection('tasks').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  deleteTaskModel,
  getTaskByIdModel,
};