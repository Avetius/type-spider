import { queues, connection } from '../init';

// get the number for fibonacci from the command line
const usersMsg = {sendFrom: 'users'}
const controllersMsg = {sendFrom: 'controllers'}

// console.log(' [x] Requesting fib(%d)', usersMsg);

const usersQueue = queues.users;
const controllersQueue = queues.controllers;
// easy optimized rpc for RabbitMQ
// send a rpc request, it will automatically be sent after the the queue declaration
// has finished successfully
usersQueue.rpc(usersMsg).then(function(result) {
  console.log(' From "users" queue got ', result.getContent());
});

controllersQueue.rpc(controllersMsg).then(function(result) {
  console.log(' From "controllers" queue got ', result.getContent());
});
// or use the method explained in the tutorial
// todo: write the code!


// after half a second close the connection
setTimeout(() => {
  connection.close();
}, 500);
