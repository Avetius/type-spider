"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    getAll(input) {
        console.log('Users.getAll');
        return { result: 'Users.getAll' };
    }
    getOne(input) {
        console.log('Users.getOne');
        return { result: 'Users.getOne' };
    }
    create(input) {
        console.log('Users.create');
        return { result: 'Users.create' };
    }
    update(input) {
        console.log('Users.update');
        return { result: 'Users.update' };
    }
    delete(input) {
        console.log('Users.delete');
        return { result: 'Users.delete' };
    }
}
exports.Controller = Controller;
;
//# sourceMappingURL=test.controller.js.map