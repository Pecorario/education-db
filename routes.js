import express from 'express';
// import bcrypt from 'bcrypt';
// import uuid from 'uuid';
// import jwt from 'jsonwebtoken';

import userMiddleware from './src/middleware/users.js';
import userController from './src/controllers/users.js';

const routes = express.Router();

// routes.get('/users', users.findAll);
// routes.post('/users', users.addUser);
// routes.get('/users/:id', users.findById);
// routes.put('/users/:id', users.updateUser);
// routes.delete('/users/:id', users.deleteUser);

routes.post(
  '/sign-up',
  userMiddleware.validateRegister,
  userController.addUser
);

routes.post('/login', userController.login);
routes.get('/secret-route', (req, res, next) => {
  res.send('This is the secret content. Only logged in users can see that!');
});

export { routes as default };
