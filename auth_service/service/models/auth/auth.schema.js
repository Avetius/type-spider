import { Sequelize } from 'sequelize';

export default auth_schema = {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    login : {
        type: Sequelize.STRING,
    },
    password : {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
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
    role : {
        type: Sequelize.ENUM,
        values: ['user', 'admin', 'owner'],
    }    
};