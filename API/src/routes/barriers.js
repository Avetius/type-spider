"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const barrierCtrl_js_1 = require("../controllers/barrierCtrl.js");
const router = express_1.Router();
router
    .get('/', barrierCtrl_js_1.default.getByName)
    .get('/id/:id', barrierCtrl_js_1.default.getById)
    .get('/all', barrierCtrl_js_1.default.getAll)
    .post('/', barrierCtrl_js_1.default.create)
    .put('/params/:id', barrierCtrl_js_1.default.update)
    .delete('/:id', barrierCtrl_js_1.default.delete)
    .get('/relations/id/:id', barrierCtrl_js_1.default.getByIdRel)
    .get('/relations/all', barrierCtrl_js_1.default.getAllRel)
    .put('/relations/:id', barrierCtrl_js_1.default.setRel)
    .post('/relations/:id', barrierCtrl_js_1.default.addRel);
exports.default = router;
//# sourceMappingURL=barriers.js.map