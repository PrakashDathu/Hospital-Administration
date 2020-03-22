import config from "../config";
import * as auth from "../util/messages/auth";
import User from '../models/user.model';
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
export const strategy = new LocalStrategy({ usernameField: 'email' },
  (email, password, done) => {
    User.findOne({ 'local.email': email }, (err, userMatch) => {
      if (err) {
        return done(err);
      }
      if (!userMatch) {
        return done(null, false, auth.wrongCredentials());
      }
      if (!userMatch.checkPassword(password)) {
        return done(null, false, auth.wrongCredentials());
      }
      if(!userMatch.isVerified) {
          return done(null, false, auth.emailLinkVerificationNeeded());
      }
      return done(null, userMatch.toAuthJSON());
    });
  }
);
export const jwtStrategy = new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey   : 'secret',
    },
    function (jwtPayload, cb) {

      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return User.findById(jwtPayload.id)
          .then(user => {
            return cb(null, user.toAuthJSON());
          })
          .catch(err => {
            return cb(auth.jwtCheckError());
          });
    }
);
