import jwt from 'jsonwebtoken';

function validateRegister(req, res, next) {
  // username min length 3
  if (!req.body.username || req.body.username.length < 3) {
    return res.status(400).send({
      message: 'Seu username deve ter pelo menos 3 caracteres'
    });
  }
  // password min 6 chars
  if (!req.body.password || req.body.password.length < 6) {
    return res.status(400).send({
      message: 'Sua senha deve ter pelo menos 6 caracteres'
    });
  }
  // password (repeat) does not match
  if (
    !req.body.password_repeat ||
    req.body.password != req.body.password_repeat
  ) {
    return res.status(400).send({
      message: 'As senhas devem ser iguais'
    });
  }
  next();
}

function isLoggedIn(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'SECRETKEY');
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).send({
      message: 'Token inválido'
    });
  }
}

export default { validateRegister, isLoggedIn };
