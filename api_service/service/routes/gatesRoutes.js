/**
 * Created by sirius on 5/12/17.
 */
import { express }  from 'express';
import { gateCtrl } from '../controllers/gatesCtrl.js';
import { isUser, isAdmin, passport } from '../setup/auth.js';
import { validate } from '../validation/validator.js';

const router = express.Router();

router
    .get('/',passport.authenticate('jwt',{ session: false}), isUser, gateCtrl.getByUser)
    .get('/:id',passport.authenticate('jwt',{ session: false}), isAdmin, gateCtrl.getById)
    .get('/all',passport.authenticate('jwt',{ session: false}), isAdmin, gateCtrl.getAll)
    .post('/',  /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('gateCreate'),*/ gateCtrl.create)
    .put('/:id', /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('gateEdit'),*/ gateCtrl.edit)
    .delete('/:id', /*passport.authenticate('jwt',{ session: false}), isAdmin, validate('gateDelete'),*/ gateCtrl.delete);

export default router;