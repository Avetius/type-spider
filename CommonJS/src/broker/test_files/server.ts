import * as amqp from 'amqp-ts'; // for use inside this package
// import { queueNames } from './config';

const connection = new amqp.Connection();
const exchange = connection.declareExchange("ServiceExchange");

const queue1 = connection.declareQueue('users', {durable: false});
const queue2 = connection.declareQueue('controllers', {durable: false});
queue1.bind(exchange);
queue2.bind(exchange);
export const queues = [queue1, queue2];

