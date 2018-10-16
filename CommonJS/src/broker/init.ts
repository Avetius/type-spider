import { queueNames } from './config';

import * as amqp from 'amqp-ts';

// create a new connection (async)
export const connection = new amqp.Connection('amqp://localhost');
export const queues = <any>{};
const declareQueues = async () => {
  await queueNames.forEach(async (name) => {
    let declaredQueue = connection.declareQueue(name, {durable: true});
    queues[name] = declaredQueue ;
  });
}
declareQueues();
// declare the rpc_queue queue, it will be created if it does not already exist (async)
// const usersQueue = connection.declareQueue('users', {durable: true});
// const controllersQueue = connection.declareQueue('controllers', {durable: true});
console.log('queues -> ', queues)

//  = {
//   users: usersQueue,
//   controllers: controllersQueue,
// }
