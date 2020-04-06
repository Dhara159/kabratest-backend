import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) throw new Error({ error: 'Invalid Email address' });
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 7
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

// Execute below code beofore document is saved (everytime)
userSchema.pre('save', async function (next) {
  const user = this;

  // Store updated password after encryption only
  if (user.isModified('password')) user.password = await bcrypt.hash(user.password, 8);
  next();
});

// Generate signed user authentication tocken using JWT
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);

  // Storing multiple tokens to provide the facility of login/logout from multiple browsers/machine (User will be able to logout from anu single machine also)
  user.tokens = [...(user.tokens), { token }];
  await user.save();
  return token;
}

// Make findByCredentials, findByToken methods available on Cart schema which are only responsible to interact with database and nothing else.

userSchema.statics.findByCredentials = async ({ email }) => await User.findOne({ email });

userSchema.statics.findByToken = async ({ token }) => await User.findOne(token);

const User = mongoose.model('User', userSchema);

export default User;