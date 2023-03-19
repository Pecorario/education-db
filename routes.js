import express from 'express';

import userMiddleware from './src/middleware/users.js';

import userController from './src/controllers/users.js';
import schoolController from './src/controllers/schools.js';
import classroomController from './src/controllers/classrooms.js';
import teacherController from './src/controllers/teachers.js';

const routes = express.Router();

routes.post(
  '/sign-up',
  userMiddleware.validateRegister,
  userController.createUser
);
routes.post('/login', userController.login);

// users
routes.delete(
  '/users/:id',
  userMiddleware.isLoggedIn,
  userController.deleteUser
);
routes.get('/users', userMiddleware.isLoggedIn, userController.getUsers);

// schools
routes.get('/schools', userMiddleware.isLoggedIn, schoolController.getSchools);
routes.post(
  '/schools',
  userMiddleware.isLoggedIn,
  schoolController.createSchool
);
routes.delete(
  '/schools/:id',
  userMiddleware.isLoggedIn,
  schoolController.deleteSchool
);
routes.get(
  '/schools/:id',
  userMiddleware.isLoggedIn,
  schoolController.findSchoolById
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
  classroomController.getClassrooms
);
routes.post(
  '/classrooms',
  userMiddleware.isLoggedIn,
  classroomController.createClassroom
);
routes.delete(
  '/classrooms/:id',
  userMiddleware.isLoggedIn,
  classroomController.deleteClassroom
);
routes.get(
  '/classrooms/:id',
  userMiddleware.isLoggedIn,
  classroomController.findClassroomById
);
routes.put(
  '/classrooms/:id',
  userMiddleware.isLoggedIn,
  classroomController.updateClassroom
);

// teachers
routes.get(
  '/teachers',
  userMiddleware.isLoggedIn,
  teacherController.getTeachers
);
routes.post(
  '/teachers',
  userMiddleware.isLoggedIn,
  teacherController.createTeacher
);
routes.delete(
  '/teachers/:id',
  userMiddleware.isLoggedIn,
  teacherController.deleteTeacher
);
routes.get(
  '/teachers/:id',
  userMiddleware.isLoggedIn,
  teacherController.getTeacherById
);
routes.put(
  '/teachers/:id',
  userMiddleware.isLoggedIn,
  teacherController.updateTeacher
);

export { routes as default };
