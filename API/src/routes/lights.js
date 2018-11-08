"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lightCtrl_js_1 = require("../controllers/lightCtrl.js");
const router = express_1.Router();
router
    .post('/entrance/:number', lightCtrl_js_1.default.action);
exports.lightRoutes = router;
//# sourceMappingURL=lights.js.map