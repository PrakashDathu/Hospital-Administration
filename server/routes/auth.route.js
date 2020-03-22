import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
import { ErrorHandler } from "../util/error";
const router = new Router();
const passport = require('../passport');

// Get the existing user info
router.route('/user').get(AuthController.getUser);

// Attempt login
router.route('/login').post(function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) { return next(new ErrorHandler(info)); }
    AuthController.login(user, res);
  })(req, res, next);
});

router.route('/verifyJwt').get(function (req, res, next) {
  passport.authenticate('jwt',function(err, user) {
    if (err) { return next(err); }
    AuthController.login(user, res);
  })(req, res, next);
});

// Attempt logout
router.route('/logout').post(AuthController.logout);

// Attempt to signup
router.route('/signup').post(AuthController.signup);

router.route('/verify/:token').get(AuthController.verify);

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  User.findById(id, function (err, user) {
    cb(err, user);
  });
});

export default router;
