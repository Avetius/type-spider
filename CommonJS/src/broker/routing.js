"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_controller_1 = require("./test.controller");
const broker_1 = require("./broker");
const controller = new test_controller_1.Controller();
const broker = new broker_1.Broker();
class Routes {
    async switch(message) {
        switch (message.header) {
            case 'create':
                return await controller.create(message.body);
        }
    }
}
const routes = new Routes();
broker.listen('users', routes.switch);
//# sourceMappingURL=routing.js.map