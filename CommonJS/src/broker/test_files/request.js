"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const broker_1 = require("../broker");
const broker = new broker_1.Broker();
async function res() {
    const result = await broker.send('users', { header: 'create', body: 'Bolyolyo' });
    const res = await result.getContent();
    console.log('res -> ', res);
    process.exit(1);
}
;
res();
//# sourceMappingURL=request.js.map