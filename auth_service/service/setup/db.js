import { Sequelize } from 'sequelize';
import { db as auth_options }   from '../../../commonjs/configs/db.config';

console.log("auth_options -> ",auth_options);
const sequelize = new Sequelize(...auth_options);

sequelize
    .authenticate()
    .then((err) => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err)
    });

export default sequelize;
