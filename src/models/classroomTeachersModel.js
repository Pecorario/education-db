import { Sequelize } from 'sequelize';
import db from '../db.js';

import { Teacher, Classroom } from '../../associations.js';

const ClassroomTeacher = db.define('classroomTeacher', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  classroomId: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: Classroom,
      key: 'id'
    }
  },
  teacherId: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: Teacher,
      key: 'id'
    }
  }
});

export default ClassroomTeacher;
