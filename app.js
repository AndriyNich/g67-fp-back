const express = require('express');
const cors = require('cors');
const logger = require('morgan');
// const { pathToFile } = require("./constants");

const { authRouter } = require('./routes/api');
const { petRouter } = require('./routes/pet');
const { noticeRouter } = require('./routes/notice');

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { friendRouter } = require('./routes/friend');
const { newsRouter } = require('./routes/news');

const formatLog = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatLog));
app.use(cors());
app.use(express.json());

app.use('/api/users', authRouter);

app.use('/api/pets', petRouter);

app.use('/api/notices', noticeRouter);

app.use('/api/friends', friendRouter);

app.use('/api/news', newsRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});
app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
