import { Sequelize } from 'sequelize';
import db from '../db.js';

const School = db.define('school', {
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
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export default School;
