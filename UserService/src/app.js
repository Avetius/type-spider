"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const broker_1 = require("../../CommonJS/src/broker/broker");
const test_controller_1 = require("./test_files/test.controller");
const broker = new broker_1.Broker();
const controller = new test_controller_1.Controller();
class Routes {
    async switch(message) {
        switch (message.header) {
            case 'getAll':
                return await controller.getAll(message.body);
                break;
            case 'getOne':
                return await controller.getOne(message.body);
                break;
            case 'create':
                return await controller.create(message.body);
                break;
            case 'update':
                return await controller.update(message.body);
                break;
            case 'delete':
                return await controller.delete(message.body);
                break;
        }
    }
}
const routes = new Routes();
broker.listen('users', routes.switch);
//# sourceMappingURL=app.js.map