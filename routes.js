import express from 'express';

import userMiddleware from './src/middleware/users.js';

import userController from './src/controllers/users.js';
import schoolController from './src/controllers/schools.js';
import classroomController from './src/controllers/classrooms.js';

const routes = express.Router();

routes.post(
  '/sign-up',
  userMiddleware.validateRegister,
  userController.addUser
);
routes.post('/login', userController.login);

// users
routes.delete(
  '/users/:id',
  userMiddleware.isLoggedIn,
  userController.deleteUser
);
routes.get('/users', userMiddleware.isLoggedIn, userController.findAll);

// schools
routes.get('/schools', userMiddleware.isLoggedIn, schoolController.findAll);
routes.post('/schools', userMiddleware.isLoggedIn, schoolController.addSchool);
routes.delete(
  '/schools/:id',
  userMiddleware.isLoggedIn,
  schoolController.deleteSchool
);
routes.get(
  '/schools/:id',
  userMiddleware.isLoggedIn,
  schoolController.findById
);
routes.put(
  '/schools/:id',
  userMiddleware.isLoggedIn,
  schoolController.updateSchool
);

// classrooms
routes.get(
  '/classrooms',
  userMiddleware.isLoggedIn,
  classroomController.findAll
);
routes.post(
  '/classrooms',
  userMiddleware.isLoggedIn,
  classroomController.addClassroom
);
routes.delete(
  '/classrooms/:id',
  userMiddleware.isLoggedIn,
  classroomController.deleteClassroom
);
routes.get(
  '/classrooms/:id',
  userMiddleware.isLoggedIn,
  classroomController.findById
);
routes.put(
  '/classrooms/:id',
  userMiddleware.isLoggedIn,
  classroomController.updateClassroom
);

export { routes as default };
