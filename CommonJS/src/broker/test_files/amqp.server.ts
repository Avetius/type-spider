import { queues } from '../init';
// import { Controller } from './test.controller';

// const controller = new Controller();

const usersQueue = queues.users;
const controllersQueue = queues.controllers;
// create an rpc consumer function for the queue, automatically returns the return value of the
// consumer function to the replyTo queue, if it exists
// this will keep running until the program is halted or is stopped with queue.stopConsumer()


const arr = [0, 1, 2, 3, 5];

async function foo(ar) {
  return await ar.map((a) => {
    return a++;
  });
}

// function bar(ar) {
//   return ar.length;
// }

usersQueue.activateConsumer(async (message) => {
  var usersMsg = message.getContent();
  console.log('usersMsg -> ', usersMsg);
  usersMsg.sendBack = 'users';
  const res = await foo(arr); // bar(arr); usersMsg
  console.log('typeof res -> ', typeof res)
  return res;
}, { noAck: true });

controllersQueue.activateConsumer((message) => {
  var controllersMsg = message.getContent();
  console.log('controllersMsg -> ', controllersMsg);
  controllersMsg.sendBack = 'controllers'
  return controllersMsg;
}, { noAck: true });

