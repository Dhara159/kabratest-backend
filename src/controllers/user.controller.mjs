import bcrypt from 'bcryptjs';

import User from './../models/User.mjs';
import handleError from './../helpers/errorHandler.mjs'

// Create new user
export const createUser = async ({ body }, res) => {
  return await handleError({
    tryFunc: async () => {
      const user = await new User(body);
      await user.save();
      // Generate new tocken when user successfully added to database to mark the user as logged-in
      const token = await user.generateAuthToken();
      return res.status(201).json({ user, token });
    }, res
  });
};

// User login
export const login = async ({ body: { email, password } }, res) => {
  return await handleError({
    tryFunc: async () => {
      const user = await User.findByCredentials({ email });
      if (!user) return res.status(400).json({ error: 'Invalid login credentials' });
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) return res.status(400).json({ error: 'Invalid login credentials' });
      // Generate new tocken to mark the user as logged-in
      const token = await user.generateAuthToken();
      return res.status(201).json({ user, token });
    }, res
  });
}