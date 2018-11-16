'use strict';
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('controller', [{
      name: "home controller",
      password: bcrypt.hashSync('pic16f84a'),
      willTopic: 'home controller/will',
      subTopic: 'home controller/sub',
      longitude: '40.176851',
      latitude: '44.518069',
      altitude: '3'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('controller', null, {});
  }
};
