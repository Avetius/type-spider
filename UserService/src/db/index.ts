import * as Sequelize from 'sequelize';

const sequelize = new Sequelize('fouraitch', 'postgres', '', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  define: {
    underscored: false,
    freezeTableName: false,
    charset: 'utf8',
    timestamps: false,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    module.exports = sequelize;
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });

export default sequelize;
