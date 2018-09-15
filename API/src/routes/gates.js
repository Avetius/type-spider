"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gatesCtrl_js_1 = require("../controllers/gatesCtrl.js");
const userRoles_1 = require("../middleware/userRoles");
const router = express_1.Router();
router
    .get('/', passport.authenticate('jwt', { session: false }), userRoles_1.isUser, gatesCtrl_js_1.default.getByUser)
    .get('/:id', passport.authenticate('jwt', { session: false }), userRoles_1.isAdmin, gatesCtrl_js_1.default.getById)
    .get('/all', passport.authenticate('jwt', { session: false }), userRoles_1.isAdmin, gatesCtrl_js_1.default.getAll)
    .post('/', gatesCtrl_js_1.default.create)
    .put('/:id', gatesCtrl_js_1.default.edit)
    .delete('/:id', gatesCtrl_js_1.default.delete);
exports.default = router;
//# sourceMappingURL=gates.js.map