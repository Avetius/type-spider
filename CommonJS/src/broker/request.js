"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const broker_1 = require("./broker");
async function res() {
    await broker_1.broker.send('users', { header: 'create', body: 'Bolyolyo' });
}
;
res();
//# sourceMappingURL=request.js.map