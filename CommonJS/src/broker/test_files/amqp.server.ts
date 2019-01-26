import { queues } from '../init';
// import { Controller } from './test.controller';
import { map, resolve } from 'bluebird';

// const controller = new Controller();

const usersQueue = queues.users;
const controllersQueue = queues.controllers;
// create an rpc consumer function for the queue, automatically returns the return value of the
// consumer function to the replyTo queue, if it exists
// this will keep running until the program is halted or is stopped with queue.stopConsumer()

const arr = [0, 1, 2, 3, 5];

function foo(ar) {
  const prom = map(ar, (a:number) => {
    return ++a;
  });
  return resolve(prom);
}

// function bar(ar) {
//   return ar.length;
// }

usersQueue.activateConsumer((message) => {
  let usersMsg = message.getContent();
  console.log('usersMsg -> ', usersMsg);
  return foo(arr).then((output) => {
    console.log('output', output);
    usersMsg.sendBack = output;
    const rep = output;
    return rep; // usersMsg;
  });
}, { noAck: true });

controllersQueue.activateConsumer((message) => {
  let controllersMsg = message.getContent();
  console.log('controllersMsg -> ', controllersMsg);
  controllersMsg.sendBack = 'controllers';
  return controllersMsg;
}, { noAck: true });
