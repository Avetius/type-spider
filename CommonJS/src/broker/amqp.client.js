"use strict";
exports.__esModule = true;
//var amqp = require('amqp-ts'); // normal use
var amqp = require("amqp-ts"); // for use inside this package
// create a new connection (async)
var connection = new amqp.Connection();
// declare the rpc_queue queue, it will be created if it does not already exist (async)
var queue = connection.declareQueue('rpc_queue', { durable: false });
// get the number for fibonacci from the command line
var args = process.argv.slice(2);
var service = args[0].toString;
var num = args[1];
var msg = {
    service: service,
    num: num
};
console.log(' [x] Requesting fib(%d)', num);
// easy optimized rpc for RabbitMQ
// send a rpc request, it will automatically be sent after the the queue declaration
// has finished successfully
queue.rpc(msg).then(function (result) {
    console.log(' [.] Got ', result.getContent());
});
// or use the method explained in the tutorial
// todo: write the code!
// after half a second close the connection
setTimeout(function () {
    connection.close();
}, 500);
