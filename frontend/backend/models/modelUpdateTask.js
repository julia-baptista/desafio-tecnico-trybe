const { ObjectId } = require('mongodb');
const connection = require('./connection');

const updateTaskModel = async (id, name, status) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const conn = await connection();
  await conn.collection('tasks').updateOne(
    { _id: ObjectId(id) },
    { $set: { name: name, status: status } },
  );
};

module.exports = {
  updateTaskModel,
};