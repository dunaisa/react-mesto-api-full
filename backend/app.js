const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const path = require('path');

const { auth } = require('./middlewares/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { handleCors } = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();

// cors
app.use(handleCors);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const {
  ObjectNotFound,
} = require('./Components/ObjectNotFound');

app.use(requestLogger);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', require('./routes/index'));

app.use(auth);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use('/*', (req, res, next) => {
  next(new ObjectNotFound('Запрашиваемый путь не существует.'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });

  next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
