// import {ExpressMiddlewareInterface} from "routing-controllers";
// import { Broker } from '../../../../CommonJS/src/broker/broker';

// const broker = new Broker();

// export class AuthMiddleware implements ExpressMiddlewareInterface { // interface implementation is optional
//   use(request: any, response: any, next?: (err?: any) => any): any {
//     console.log("auth request sent...");
//     broker.send('users', {});
//     if(next) next(null);
//   }
// }