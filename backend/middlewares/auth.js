const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

console.log(NODE_ENV);

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
