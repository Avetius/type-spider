"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
class ExpressApp {
    constructor() {
        this.app = express();
        this.config();
        this.routesConfig();
        this.initBroker();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(morgan('combined'));
        this.app.use(methodOverride());
        this.app.use(helmet.xssFilter());
        this.app.disable('x-powered-by');
        this.app.use(function (err, _req, _res, next) {
            err.status = 404;
            next(err);
        });
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
            res.json({
                message: 'Hello World!'
            });
        });
        this.app.use('/', router);
    }
    async initBroker() {
    }
}
exports.app = new ExpressApp().app;
//# sourceMappingURL=server.js.map