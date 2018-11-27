import * as connection from 'knex';

export const knex = connection({
  client: 'pg',
  version: '11.1',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'UserService'
  }
});

console.log('knex -> ', knex);