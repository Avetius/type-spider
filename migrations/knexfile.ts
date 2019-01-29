// Update with your config settings.

/*==================
* Init Database modules and return instances
==================*/
declare var process: {
    argv: Array<string>
    env: {
        NODE_ENV: string,
        UV_THREADPOOL_SIZE: number
    }
};
 
import * as  Bluebird from 'bluebird';
let CONF, 
    env_index = process.argv? process.argv.findIndex((a)=> a==='--env')+ 1 : undefined
    
if (env_index) CONF = require(`../config/${process.argv[env_index]}.json`)
else CONF = require('../config/configuration.json')


const Config = {
  port: 5432,
  host: '127.0.0.1',
  database: 'ob-event',
  user: 'postgres',
  password: 'postgres',
};

module.exports = {

  development: {
    client: 'postgresql',
    connection: Config
  },

  staging: {
    client: 'postgresql',
    connection: Config,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: Config,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
