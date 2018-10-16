import { queues } from './init';

const usersQueue = queues.users;
const controllersQueue = queues.controllers;
// create an rpc consumer function for the queue, automatically returns the return value of the
// consumer function to the replyTo queue, if it exists
// this will keep running until the program is halted or is stopped with queue.stopConsumer()
usersQueue.activateConsumer((message) => {
  var usersMsg = message.getContent();
  console.log('usersMsg -> ', usersMsg);
  usersMsg.sendBack = 'users'
  // return fibonacci number
  return usersMsg;
}, {noAck: true});

controllersQueue.activateConsumer((message) => {
  var controllersMsg = message.getContent();
  console.log('controllersMsg -> ', controllersMsg);
  controllersMsg.sendBack = 'controllers'
  // return fibonacci number
  return controllersMsg;
}, {noAck: true});