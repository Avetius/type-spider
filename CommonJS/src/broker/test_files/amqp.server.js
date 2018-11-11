"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = require("../init");
const usersQueue = init_1.queues.users;
const controllersQueue = init_1.queues.controllers;
const arr = [0, 1, 2, 3, 5];
async function foo(ar) {
    return await ar.map((a) => {
        return a++;
    });
}
usersQueue.activateConsumer(async (message) => {
    var usersMsg = message.getContent();
    console.log('usersMsg -> ', usersMsg);
    usersMsg.sendBack = 'users';
    const res = await foo(arr);
    return res;
}, { noAck: true });
controllersQueue.activateConsumer((message) => {
    var controllersMsg = message.getContent();
    console.log('controllersMsg -> ', controllersMsg);
    controllersMsg.sendBack = 'controllers';
    return controllersMsg;
}, { noAck: true });
//# sourceMappingURL=amqp.server.js.map