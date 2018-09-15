import { Router, Request, Response } from 'express';
import { isAdmin, isUser, isLoggedIn } from '../middleware/userRoles';
import validate from '../validators/validator';

const router: Router = Router();

router
    .post('/signup', validate('userSignUp'), )
    .post('/login', validate('userLogin'), userCtrl.login)
    .post('/verify/:verifyToken', userCtrl.verify)
    .post('/upload', /*upload.single('image'),*/ userCtrl.upload)
    //================================= User routes  =================================================================================
    .get('/me', passport.authenticate('jwt',{ session: false}), isUser, userCtrl.userGet)
    .put('/me',     passport.authenticate('jwt',{ session: false}), isUser,    validate('userEdit'),   userCtrl.userEdit)
    //================================= Admin routes =================================================================================
    .post('/',   passport.authenticate('jwt',{ session: false}), isAdmin,   validate('userCreate'), userCtrl.userCreate)
    .get('/',    passport.authenticate('jwt',{ session: false}), isAdmin,                           userCtrl.userGetAll)
    .get('/:id',    passport.authenticate('jwt',{ session: false}), isAdmin,                           userCtrl.userGet)
    .put(':id',    passport.authenticate('jwt',{ session: false}), isAdmin,   validate('userEdit'),   userCtrl.userEdit)
    .delete(':id', passport.authenticate('jwt',{ session: false}), isAdmin,                           userCtrl.userDelete)

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook auth and login
    .get('/facebook', passport.authenticate('facebook', { scope : 'email' }))
    // handle the callback after facebook has authenticated the user
    .get('/facebook/callback', passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }))
    // route for logging out
    .get('/logout', userCtrl.logout);

export const userRoutes: Router = router;
