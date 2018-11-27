// import { resolve } from 'bluebird';

export class Controller {
  getAll(input) {
    return {result: 'Users.getAll'};
  }

  getOne(input) {
    return {result: 'Users.getOne'};
  }
  
  create(input) {
    return {result: 'Users.create'};
  }
  
  update(input) {
    return {result: 'Users.update'};
  }
  
  delete(input) {
    return {result: 'Users.delete'};
  }
};
