/**
 * Created by sirius on 5/20/17.
 * */
import expressAjv from 'express-ajv';
const schema = expressAjv.schema;
// admin validations
import userSignUp from './usersRules/userSignUp.json';
import userLogin from './usersRules/userLogin.json';
import userEdit from './usersRules/userEdit.json';
import userCreate from './usersRules/userCreate.json';
import barrierCreate from './barrierRules/barrierCreate.json';
import barrierEdit from './barrierRules/barrierEdit.json';

schema.addSchema('userSignUp', userSignUp);
schema.addSchema('userLogin', userLogin);
schema.addSchema('userEdit', userEdit);
schema.addSchema('userCreate', userCreate);

schema.addSchema('barrierCreate', barrierCreate);
schema.addSchema('barrierEdit', barrierEdit);

//to prevent raise condition in your routes use this module
export default expressAjv.validatorFactory;

// todo make loop for requireing all jsons and addScheme them with their names