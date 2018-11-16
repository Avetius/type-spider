"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_controller_1 = require("./test.controller");
const broker_1 = require("../broker");
const controller = new test_controller_1.Controller();
const broker = new broker_1.Broker();
async function switchRoutes(message) {
    switch (message.header) {
        case 'create':
            const result = await controller.create(message.body);
            return result;
    }
}
broker.listen('users', switchRoutes);
//# sourceMappingURL=routing.js.map