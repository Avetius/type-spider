"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = require("../init");
const bluebird_1 = require("bluebird");
const usersQueue = init_1.queues.users;
const controllersQueue = init_1.queues.controllers;
const arr = [0, 1, 2, 3, 5];
function foo(ar) {
    const prom = bluebird_1.map(ar, (a) => {
        return ++a;
    });
    return bluebird_1.resolve(prom);
}
usersQueue.activateConsumer((message) => {
    var usersMsg = message.getContent();
    console.log('usersMsg -> ', usersMsg);
    return foo(arr).then((output) => {
        console.log('output', output);
        usersMsg.sendBack = output;
        const rep = output;
        return rep;
    });
}, { noAck: true });
controllersQueue.activateConsumer((message) => {
    var controllersMsg = message.getContent();
    console.log('controllersMsg -> ', controllersMsg);
    controllersMsg.sendBack = 'controllers';
    return controllersMsg;
}, { noAck: true });
//# sourceMappingURL=amqp.server.js.map