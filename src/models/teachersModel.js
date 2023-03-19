import { Sequelize } from 'sequelize';
import db from '../db.js';

const Teacher = db.define('teacher', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export default Teacher;
