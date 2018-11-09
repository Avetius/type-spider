"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = require("../init");
const usersQueue = init_1.queues.users;
const controllersQueue = init_1.queues.controllers;
usersQueue.activateConsumer((message) => {
    var usersMsg = message.getContent();
    console.log('usersMsg -> ', usersMsg);
    usersMsg.sendBack = 'users';
    return usersMsg;
}, { noAck: true });
controllersQueue.activateConsumer((message) => {
    var controllersMsg = message.getContent();
    console.log('controllersMsg -> ', controllersMsg);
    controllersMsg.sendBack = 'controllers';
    return controllersMsg;
}, { noAck: true });
//# sourceMappingURL=amqp.server.js.map