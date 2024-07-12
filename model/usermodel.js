const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a user must have a name'],
  },
  email: {
    type: String,
    required: [true, 'A user must have a email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'a user must have a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    select: false,
    required: [true, 'a password must be provided'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    requierd: [true, 'a password confirm is must'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'please enteer the same password in password confirm',
    },
  },
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
const User = new mongoose.model('User', userSchema);
module.exports = User;
