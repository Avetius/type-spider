'use strict';
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [{
      firstname: "Avet",
      lastname: "Sargsyan",
      emailVerified: true,
      username: 'Owner',
      privil: 'owner',
      email: 'avet.sargsyan@gmail.com',
      subTopic: 'avet.sargsyan@gmail.com/sub',
      password: bcrypt.hashSync('pic16f84a'),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};
