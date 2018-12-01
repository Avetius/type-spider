/* tslint:disable:variable-name*/
import * as Sequelize from 'sequelize';

export const UserSchema = {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
  },
  firstname: {
    type: Sequelize.STRING,
  },
  lastname: {
    type: Sequelize.STRING,
  },
  role: {
    type: Sequelize.ENUM,
    values: ['user', 'admin'],
    defaultValue: 'user',
  },
};
