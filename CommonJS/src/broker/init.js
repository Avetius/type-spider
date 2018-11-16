"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amqp = require("amqp-ts");
exports.connection = new amqp.Connection('amqp://localhost');
exports.queues = {};
exports.queues.users = exports.connection.declareQueue('users', { durable: true });
exports.queues.controllers = exports.connection.declareQueue('controllers', { durable: true });
//# sourceMappingURL=init.js.map