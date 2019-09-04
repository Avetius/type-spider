import chalk from 'chalk';
import 'dotenv/config';
import * as Knex from 'knex';
import { Model } from 'objection';
import { connection } from './config.js';

const devMode = process.env.devMode ? process.env.devMode.toString() : '';
console.log(chalk.whiteBright('devMode >>> ', devMode));
let db;

if (devMode === 'test') db = connection.test;
if (devMode === 'prod') db = connection.prod;
console.log(chalk.whiteBright(`db >>> ${db.database}`));
const knex = Knex({
  client: 'pg',
  connection: db,
});

Model.knex(knex);
export default knex;
