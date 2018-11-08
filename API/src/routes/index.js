"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("./users");
const gates_1 = require("./gates");
const lights_1 = require("./lights");
const meters_1 = require("./meters");
const barriers_1 = require("./barriers");
const router = express_1.Router();
router.use('/user', users_1.userRoutes);
router.use('/gate', gates_1.gateRoutes);
router.use('/light', lights_1.lightRoutes);
router.use('/meter', meters_1.meterRoutes);
router.use('/barrier', barriers_1.barrierRoutes);
module.exports = router;
//# sourceMappingURL=index.js.map