const connection = require('./connection');

const createTaskModel = async (name, status) => {
  // const createAt = new Date(YYYY-mm-ddTHH,MM,ss);
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hour = date.getHours();
  const mins = date.getMinutes();
  const seconds = date.getSeconds();
  const conn = await connection();
  const createdAt = day + '/' + month + '/' + year + ' ' + hour + ':' + mins + ':' + seconds;
  const { insertedId } = await conn.collection('tasks').insertOne({ name, status, createdAt });
  return insertedId;
};

const getDateModel = async (id) => {
  const conn = await connection();
  const date = await conn.collection('tasks').findOne(
    {_id: id},
    {"createdAt": 1, "_id": 0}
  );
  return date;
}

module.exports = {
  createTaskModel,
  getDateModel
}