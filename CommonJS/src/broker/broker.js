"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = require("./init");
class Broker {
    async listen(queueName, callback) {
        init_1.queues[queueName].activateConsumer(async (message) => {
            const msg = message.getContent();
            const cbPromise = callback(msg);
            const result = Promise.resolve(cbPromise);
            console.log('broker.result -> ', result);
            return result;
        }, { noAck: true });
    }
    async send(queueName, message) {
        return init_1.queues[queueName].rpc(message).then(async (result) => {
            console.log(' From "users" queue got ', await result.getContent());
            return await result.getContent();
        });
    }
}
exports.Broker = Broker;
//# sourceMappingURL=broker.js.map