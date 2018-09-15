import { Router, Request, Response } from 'express';
import barrierCtrl from '../controllers/barrierCtrl.js';
import { isAdmin, isUser, isLoggedIn } from '../middleware/userRoles';

import validate from '../validation/validator.js';

const router = Router();

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

export const barrierRoutes: Router = router;
