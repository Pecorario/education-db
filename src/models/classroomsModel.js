import { Sequelize } from 'sequelize';
import db from '../db.js';

const Classroom = db.define('classroom', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  deskCapacity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  isBlocked: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
  // schedule: {
  //   type: Sequelize.STRING,
  //   allowNull: false
  // }
});

export default Classroom;
