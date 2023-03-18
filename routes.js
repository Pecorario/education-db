import express from 'express';
import users from './src/controllers/users.js';

const routes = express.Router();

routes.get('/users', users.findAll);
routes.post('/users', users.addUser);
routes.get('/users/:id', users.findById);
routes.put('/users/:id', users.updateUser);
routes.delete('/users/:id', users.deleteUser);

export { routes as default };
