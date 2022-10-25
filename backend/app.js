const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const path = require('path');

const { auth } = require('./middlewares/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

const {
  ObjectNotFound,
} = require('./Components/ObjectNotFound');

const allowedCors = [
  'https://memesto.nomoredomains.icu',
  'http://memesto.nomoredomains.icu',
  'http://localhost',
  'http://127.0.0.1'
];

app.use(function (req, res, next) {
  const { method } = req;
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers['access-control-request-headers'];

  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    // res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
});

// app.use(express.static('build'));

// // Serve the index.html for all the other requests so that the
// // router in the JavaScript application can render the necessary components
// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname + '/build/index.html'));
//   //__dirname : It will resolve to your project folder.
// });

// раздаём папку с собранным фронтендом
// app.use(express.static(path.join(__dirname, 'public')));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

app.use(requestLogger);

app.use(express.static(path.join(__dirname, 'build')));

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
