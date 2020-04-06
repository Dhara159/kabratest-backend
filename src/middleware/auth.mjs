import jwt from 'jsonwebtoken';

import User from '../models/User.mjs';

// Middleware to authenticate user and make other routes accessible only to the logged in user
const auth = async (req, res, next) => {
  // If authorization header not found in user request
  if (!req.header('Authorization')) return throwUserNotFound(res);
  const token = req.header('Authorization').replace('Bearer ', '');
  const data = jwt.verify(token, process.env.JWT_KEY);
  try {
    // Identify the user based on generated token at login time
    const user = await User.findByToken({
      token: { _id: data._id, 'tokens.token': token }
    });
    if (!user) return throwUserNotFound(res);

    // Make user data accesible to everywhere
    req.user = user;
    req.token = token;

    // Passon the execution pointer to next available function / callback
    next();
  } catch (error) {
    return throwUserNotFound(res);
  }
}

// Generalized user not found response
const throwUserNotFound = (res) => res.status(401).json({ error: 'Not authorized to access this resource' });

export default auth;