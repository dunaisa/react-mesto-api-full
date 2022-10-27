const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const path = require('path');

const { auth } = require('./middlewares/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
// app.use(cors());
const allowedCors = [
  'https://memesto.nomoredomains.icu',
  'http://memesto.nomoredomains.icu',
  'https://api.memesto.nomoredomains.icu',
  'http://api.memesto.nomoredomains.icu',
  'http://localhost:7777',
  'https://localhost:7777',
  'http://localhost: 127.0.0.1',
  'localhost:127.0.0.1'
];

// cors
app.use(function (req, res, next) {
  const { method } = req;
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers['access-control-request-headers'];

  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
});

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

app.use(errorLogger);

app.use(errors());



app.use('/*', (req, res, next) => {
  next(new ObjectNotFound('Запрашиваемый путь не существует.'));
});

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
