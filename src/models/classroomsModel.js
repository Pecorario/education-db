import { Sequelize } from 'sequelize';
import db from '../db.js';

export default db.define('classroom', {
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
  },
  schoolId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
