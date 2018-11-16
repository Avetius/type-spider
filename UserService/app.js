"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const broker_1 = require("../CommonJS/src/broker/broker");
const user_controller_1 = require("./src/services/user/controllers/user.controller");
const db_1 = require("./src/db");
console.log('db -> ', db_1.db);
const broker = new broker_1.Broker();
const userController = new user_controller_1.UserController();
async function actions(message) {
    let result;
    switch (message.header) {
        case 'getAll':
            result = userController.getAll(message.body);
            break;
        case 'getOne':
            result = userController.getOne(message.body);
            break;
        case 'create':
            result = userController.create(message.body);
            break;
        case 'update':
            result = userController.update(message.body);
            break;
        case 'delete':
            result = userController.delete(message.body);
            break;
        case 'signup':
            result = userController.signup(message.body);
            break;
        case 'login':
            result = userController.login(message.body);
            break;
        case 'loginJWT':
            result = userController.loginJWT(message.body);
            break;
        case 'loginFB':
            result = userController.loginFB(message.body);
            break;
        case 'loginGoogle':
            result = userController.loginGoogle(message.body);
            break;
        case 'deserializeUser':
            result = userController.deserializeUser(message.body);
            break;
    }
    console.log('app.result -> ', result);
    return result;
}
broker.listen('users', actions);
console.log('listening to "users"');
//# sourceMappingURL=app.js.map