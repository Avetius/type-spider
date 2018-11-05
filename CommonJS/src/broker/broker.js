"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = require("./init");
class Broker {
    listen(queueName, cb) {
        return init_1.queues[queueName].activateConsumer((message) => {
            var controllersMsg = message.getContent();
            controllersMsg.sendBack = 'controllers';
            return controllersMsg;
        }, { noAck: true });
    }
    send(queueName, message) {
        return init_1.queues[queueName].rpc(message).then(function (result) {
            console.log(' From "users" queue got ', result.getContent());
            return result;
        });
    }
}
exports.Broker = Broker;
//# sourceMappingURL=broker.js.map