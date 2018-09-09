export default class BaseModel {
    constructor() {
        if (new.target === Abstract) {
          throw new TypeError("Cannot construct Abstract instances directly");
        }
    }
    static db;
    static tableName='';
     
    save(){}; 
    saveWithID(){}; 
    update(){};
    delete(){};
    findOne(){};
    findAll(){};
}
