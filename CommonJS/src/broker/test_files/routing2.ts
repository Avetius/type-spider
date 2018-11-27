import broker from './broker2';
// import { Controller } from './test.controller';
// 
// const controller = new Controller();
//
// class Routes {
//   public async switch(message) {
//     switch (message.header) {
//       case 'create':
//       const result = await controller.create(message.body);
//       console.log('result', result);
//       return result;
//     }
//   }
// }

// const routes = new Routes();
broker.listen('users'); // , routes.switch