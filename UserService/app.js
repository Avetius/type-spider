"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const broker_1 = require("../CommonJS/src/broker/broker");
const test_controller_1 = require("./src/test_files/test.controller");
const broker = new broker_1.Broker();
const controller = new test_controller_1.Controller();
async function actions(message) {
    let result;
    switch (message.header) {
        case 'getAll':
            result = await controller.getAll(message.body);
            break;
        case 'getOne':
            result = await controller.getOne(message.body);
            break;
        case 'create':
            result = await controller.create(message.body);
            break;
        case 'update':
            result = await controller.update(message.body);
            break;
        case 'delete':
            result = await controller.delete(message.body);
            break;
    }
    console.log('app.result -> ', result);
    return result;
}
broker.listen('users', actions);
//# sourceMappingURL=app.js.map