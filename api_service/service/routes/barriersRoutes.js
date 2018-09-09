/**
 * Created by sirius on 10/12/17.
 */
import { express }     from 'express';
import { barrierCtrl } from '../controllers/barrierCtrl.js';
import { isUser, isAdmin, passport } from '../setup/auth.js';
import { validate }    from '../validation/validator.js';

const router = express.Router();

router
    .get('/', /*passport.authenticate('jwt',{ session: false}), isUser, */barrierCtrl.getByName)
    .get('/id/:id', /*passport.authenticate('jwt',{ session: false}), isAdmin, */barrierCtrl.getById)
    .get('/all', /*passport.authenticate('jwt',{ session: false}), isAdmin, */barrierCtrl.getAll)
    .post('/',  /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('barrierCreate'),*/ barrierCtrl.create)
    .put('/params/:id', /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('barrierEdit'),*/ barrierCtrl.update)
    .delete('/:id', /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('barrierDelete'),*/ barrierCtrl.delete)
/*-----------------------------------------------RELATIONS---------------------------------------------------------------------*/
    .get('/relations/id/:id', /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('barrierEdit'),*/ barrierCtrl.getByIdRel)
    .get('/relations/all', /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('barrierEdit'),*/ barrierCtrl.getAllRel)
    .put('/relations/:id', /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('barrierEdit'),*/ barrierCtrl.setRel)
    .post('/relations/:id', /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('barrierEdit'),*/ barrierCtrl.addRel);

export default router;