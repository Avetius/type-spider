"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const meterCtrl_js_1 = require("../controllers/meterCtrl.js");
const router = express_1.Router();
router
    .get('/electricity', meterCtrl_js_1.default.action)
    .post('/electricity', meterCtrl_js_1.default.action);
exports.default = router;
//# sourceMappingURL=meters.js.map