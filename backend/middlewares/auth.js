const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;

const {
  UnauthorizedError,
} = require('../Components/UnauthorizedError');

const auth = (req, res, next) => {
  // тут будет вся авторизация
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');

  } catch (err) {
    // отправим ошибку, если не получилось
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next();
};

module.exports = {
  auth,
};

// const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzVhNDU5NTM4MzNjZjVkMTI2M2E0YTMiLCJpYXQiOjE2NjY4NjA0NDYsImV4cCI6MTY2NzQ2NTI0Nn0.EcSPub18IP-80nygx7T0Hb9aEeOsXps4Ku4DBkuJFMc'; // вставьте сюда JWT, который вернул публичный сервер
// const SECRET_KEY_DEV = '30666f7bb363163f0cbd9a05dbe0b3e74afd8bec18eb29833f075a02fc914004'; // вставьте сюда секретный ключ для разработки из кода
// try {
//   const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
//   console.log('\x1b[31m%s\x1b[0m', `
// Надо исправить. В продакшне используется тот же
// секретный ключ, что и в режиме разработки.
// `);
// } catch (err) {
//   if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
//     console.log(
//       '\x1b[32m%s\x1b[0m',
//       'Всё в порядке. Секретные ключи отличаются'
//     );
//   } else {
//     console.log(
//       '\x1b[33m%s\x1b[0m',
//       'Что-то не так',
//       err
//     );
//   }
// }

