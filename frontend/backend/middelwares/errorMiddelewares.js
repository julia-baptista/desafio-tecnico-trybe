const errorMiddleware = (err, req, res, _next) => {
  console.log('-----------------------------', err);
  if (err.status) {
    const { code, message } = err;
    return res.status(err.status).json({ err: { code, message } });
  }

  return res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorMiddleware;
