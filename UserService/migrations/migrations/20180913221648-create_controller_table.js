'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('controller', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name : {type: Sequelize.STRING},
      password : {type: Sequelize.STRING},
      willTopic : {type: Sequelize.STRING},
      subTopic : {type: Sequelize.STRING},
      longitude: { type: Sequelize.STRING},
      latitude: { type: Sequelize.STRING},
      altitude: { type: Sequelize.STRING},
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('controller');
  }
};
