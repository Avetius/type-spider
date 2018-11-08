"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoles_1 = require("../middleware/userRoles");
const validator_1 = require("../validators/validator");
const router = express_1.Router();
router
    .post('/signup', validator_1.default('userSignUp'))
    .post('/login', validator_1.default('userLogin'), userCtrl.login)
    .post('/verify/:verifyToken', userCtrl.verify)
    .post('/upload', userCtrl.upload)
    .get('/me', passport.authenticate('jwt', { session: false }), userRoles_1.isUser, userCtrl.userGet)
    .put('/me', passport.authenticate('jwt', { session: false }), userRoles_1.isUser, validator_1.default('userEdit'), userCtrl.userEdit)
    .post('/', passport.authenticate('jwt', { session: false }), userRoles_1.isAdmin, validator_1.default('userCreate'), userCtrl.userCreate)
    .get('/', passport.authenticate('jwt', { session: false }), userRoles_1.isAdmin, userCtrl.userGetAll)
    .get('/:id', passport.authenticate('jwt', { session: false }), userRoles_1.isAdmin, userCtrl.userGet)
    .put(':id', passport.authenticate('jwt', { session: false }), userRoles_1.isAdmin, validator_1.default('userEdit'), userCtrl.userEdit)
    .delete(':id', passport.authenticate('jwt', { session: false }), userRoles_1.isAdmin, userCtrl.userDelete)
    .get('/facebook', passport.authenticate('facebook', { scope: 'email' }))
    .get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/'
}))
    .get('/logout', userCtrl.logout);
exports.userRoutes = router;
//# sourceMappingURL=users.js.map