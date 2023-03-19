import jwt from 'jsonwebtoken';

const validateRegister = (req, res, next) => {
  if (!req.body.username || req.body.username.length < 3) {
    return res.status(400).json({
      message: 'Seu username deve ter pelo menos 3 caracteres'
    });
  }

  if (!req.body.password || req.body.password.length < 6) {
    return res.status(400).json({
      message: 'Sua senha deve ter pelo menos 6 caracteres'
    });
  }

  if (
    !req.body.password_repeat ||
    req.body.password != req.body.password_repeat
  ) {
    return res.status(400).json({
      message: 'As senhas devem ser iguais'
    });
  }
  next();
};

function isLoggedIn(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'SECRETKEY');
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Token inválido'
    });
  }
}

export default { validateRegister, isLoggedIn };
