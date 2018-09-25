"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const broker_1 = require("./broker");
const broker = new broker_1.Broker();
async function res() {
    const res = await broker.send('users', { header: 'create', body: 'Bolyolyo' });
    console.log('res -> ', res);
}
;
res();
//# sourceMappingURL=request.js.map