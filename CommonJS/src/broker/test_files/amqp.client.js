"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = require("../init");
const usersMsg = { sendFrom: 'users' };
const controllersMsg = { sendFrom: 'controllers' };
console.log(' [x] Requesting fib(%d)', usersMsg);
const usersQueue = init_1.queues.users;
const controllersQueue = init_1.queues.controllers;
usersQueue.rpc(usersMsg).then(function (result) {
    console.log(' From "users" queue got ', result.getContent());
});
controllersQueue.rpc(controllersMsg).then(function (result) {
    console.log(' From "controllers" queue got ', result.getContent());
});
setTimeout(() => {
    init_1.connection.close();
}, 500);
//# sourceMappingURL=amqp.client.js.map