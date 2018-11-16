"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const user_controller_1 = require("./controllers/user.controller");
const routing_controllers_1 = require("routing-controllers");
class ExpressApp {
    constructor() {
        this.initBroker();
        this.app = express();
        this.config();
        this.routesConfig();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(morgan('short'));
        this.app.use(methodOverride());
        this.app.use(helmet.xssFilter());
        this.app.disable('x-powered-by');
        this.app.use(function (_req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
            res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }
    routesConfig() {
        const router = express.Router();
        router.get('/', (_req, res) => {
            res.json({ message: 'Hello World!' });
        });
        this.app.use('/', router);
    }
    async initBroker() {
    }
}
const app = new ExpressApp().app;
routing_controllers_1.useExpressServer(app, {
    controllers: [user_controller_1.UserController]
});
exports.default = app;
//# sourceMappingURL=server.js.map