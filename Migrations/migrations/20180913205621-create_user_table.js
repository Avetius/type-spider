'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username : {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: [5,30],
            notEmpty: true,
        }
      },
      email : {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: [5,50],
            isEmail: true,
            notEmpty: true
        }
      },
      password : {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [5,40],
            isAlphanumeric: true
        }
      },
      firstname: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true,
        validate: {
            len: [1,40],
            notEmpty: true,
            is: ["^[a-z]+$",'i']
        }
      },
      lastname: {
          type: Sequelize.STRING,
          unique: false,
          allowNull: true,
          validate: {
              len: [1,40],
              notEmpty: true,
              is: ["^[a-z]+$",'i'],
          }
      },
      subTopic: {
          type: Sequelize.STRING
      },
      facebookID          : {type: Sequelize.STRING},
      facebookToken       : {type: Sequelize.STRING},
      facebookEmail       : {type: Sequelize.STRING},
      facebookName        : {type: Sequelize.STRING},

      twitterID           : {type: Sequelize.STRING},
      twitterToken        : {type: Sequelize.STRING},
      twitterDisplayName  : {type: Sequelize.STRING},
      twitterUsername     : {type: Sequelize.STRING},

      googleID            : {type: Sequelize.STRING},
      googleToken         : {type: Sequelize.STRING},
      googleEmail         : {type: Sequelize.STRING},
      googleName          : {type: Sequelize.STRING},

      verifyToken         : {type: Sequelize.STRING},
      emailVerified       : {
          type: Sequelize.BOOLEAN,
          defaultValue: false
      },
      /* For reset password */
      resetPasswordToken  : { type: Sequelize.STRING},
      resetPasswordExpires: { type: Sequelize.DATE},
      accessToken         : { type : Sequelize.STRING},
      privil : {
          /*allowNull: true,*/ //issue with false
          type: Sequelize.ENUM,
          values: ['user', 'admin', 'owner', 'superuser'],
          /*defaultValue: 'user'*/
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user');
  }
};
