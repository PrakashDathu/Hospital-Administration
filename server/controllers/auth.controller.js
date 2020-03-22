import User from '../models/user.model';
import {sendEmailVerificationLink} from "../mailer";
import Token from '../models/token.model';
import { ErrorHandler } from "../util/error";
import * as auth from "../util/messages/auth";

/**
 * Get the existing user
 * @param req
 * @param res
 * @returns void
 */
export function getUser(req, res) {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json(auth.userNotFound());
  }
}

/**
 * Attempt to login
 * @param req
 * @param res
 * @returns void
 */
export function login(user, res) {
  res.json(auth.loginSuccess(user));
}

/**
 * Attempt to logout
 * @param req
 * @param res
 * @returns void
 */
export function logout(req, res) {
  if (req.user) {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.json({ msg: 'Logging you out' });
  } else {
    res.json({ msg: 'No user to log out' });
  }
}

/**
 * Attempt to signup
 * @param req
 * @param res
 * @returns void
 */
export function signup(req, res, next) {
  const { email, password, firstName, lastName } = req.body;

  User.findOne({ 'local.email': email }, (err, userMatch) => {
    if (userMatch) {
      return next(new ErrorHandler(auth.userExists()));
    }
    console.log(password);
    const newUser = new User({
      firstName: firstName,
      lastName:lastName,
      'local.email': email,
      'local.password': password,
    });

    newUser.save((error, savedUser) => {
      if (error) {
      return next(new ErrorHandler(auth.userRegistrationFailed()));
      }
      const token = savedUser.generateVerificationToken();
      token.save();
      sendEmailVerificationLink(req, savedUser, token.token);
      return res.json(auth.successRegistration());
    });
  });
}


// ===EMAIL VERIFICATION
// @route GET api/verify/:token
// @desc Verify token
// @access Public
exports.verify = async (req, res,next) => {
  if(!req.params.token) {
    return next(new ErrorHandler(auth.invalidLinkEmailVerification()));
  }

  try {
    // Find a matching token
    const token = await Token.findOne({ token: req.params.token });

    if (!token)  return next(new ErrorHandler(auth.failedAuthToken()));

    // If we found a token, find a matching user
    User.findOne({ _id: token.userId }, (err, user) => {
      if (!user)  return next(new ErrorHandler(auth.failedAuthToken()));
      if (user.isVerified) return next(new ErrorHandler(auth.userAlreadyVerified()));

      // Verify and save the user
      user.isVerified = true;
      user.save(function (err) {
        if (err) return next(new ErrorHandler(auth.internalServerError()));
        Token.findOneAndDelete(token);
        res.status(200).json(auth.successEmailVerification());
      });
    });
  } catch (error) {
    return next(new ErrorHandler(auth.internalServerError()));
  }
};
