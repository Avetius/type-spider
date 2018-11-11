"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const broker_1 = require("../../../CommonJS/src/broker/broker");
const broker = new broker_1.Broker();
let UserController = class UserController {
    async getAll() {
        console.log('getAll');
        const result = await broker.send('users', { header: 'getAll', body: {} });
        console.log('result -> ', result);
        return result;
    }
    async getOne(id) {
        const result = await broker.send('users', { header: 'getOne', body: { id } });
        console.log('result -> ', result);
        return result;
    }
    async create(user) {
        return await broker.send('users', { header: 'create', body: { user } });
    }
    async update(id, user) {
        return await broker.send('users', { header: 'update', body: { id, user } });
    }
    async remove(id) {
        return await broker.send('users', { header: 'delete', body: id });
    }
};
__decorate([
    routing_controllers_1.Get("/users"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
__decorate([
    routing_controllers_1.Get("/users/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOne", null);
__decorate([
    routing_controllers_1.Post("/users"),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    routing_controllers_1.Put("/users/:id"),
    __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    routing_controllers_1.Delete("/users/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
UserController = __decorate([
    routing_controllers_1.Controller()
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map