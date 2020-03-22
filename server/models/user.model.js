import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Token from "../models/token.model";
import crypto from "crypto";

const Schema = mongoose.Schema;
mongoose.promise = Promise;

// Define userSchema
const userSchema = new Schema({
  firstName: { type: String, unique: false },
  lastName: { type: String, unique: false },
  local: {
    email: { type: String, unique: true,  index: true, required: false },
    password: { type: String, unique: false, required: false },
  },
  isVerified: { type: Boolean, 'default': false },
  isAccountActivate: { type: Boolean, 'default': true },
      resetPasswordToken: {
        type: String,
        required: false
      },
      resetPasswordExpires: {
        type: Date,
        required: false
      },
},{ timestamps: true },
);

// Define schema methods
userSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword,this.local.password);
  },
  hashPassword: function (plainTextPassword) {
    return bcrypt.hashSync(plainTextPassword, 10);
  },
  generateJWT: function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
    return jwt.sign({
      email: this.local.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
  },
  toAuthJSON: function () {
    return {
      _id: this._id,
      email: this.local.email,
      token: this.generateJWT(),
    };
  },
  generatePasswordReset: function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
  },
  generateVerificationToken: function() {
    let payload = {
      userId: this._id,
      token: crypto.randomBytes(20).toString('hex')
    };
    return new Token(payload);
  },
};

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
  if (!this.isModified('local.password')) {
    return next();
  } else {
    this.local.password = this.hashPassword(this.local.password);
    return next();
  }
});

// Create reference to User & export
const User = mongoose.model('User', userSchema);
module.exports = User;
