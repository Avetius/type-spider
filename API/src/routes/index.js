"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("./users");
const gateRoutes = require("./gates");
const lightRoutes = require("./lights");
const meterRoutes = require("./meters");
const barrierRoutes = require("./barriers");
const router = express_1.Router();
router.use('/user', users_1.router);
router.use('/gate', gateRoutes);
router.use('/light', lightRoutes);
router.use('/meter', meterRoutes);
router.use('/barrier', barrierRoutes);
module.exports = router;
//# sourceMappingURL=index.js.map