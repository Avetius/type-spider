// import { queueNames } from './config';

import * as amqp from 'amqp-ts';

// create a new connection (async)
export const connection = new amqp.Connection('amqp://localhost');
export const queues = <any>{};

queues.users = connection.declareQueue('users', {durable: true});
queues.controllers = connection.declareQueue('controllers', {durable: true});
