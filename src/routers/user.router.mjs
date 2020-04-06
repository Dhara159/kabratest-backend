import express from 'express';

import { createUser, login } from './../controllers/user.controller.mjs';

const userRouter = express.Router();

// Available endpoint for User related operations

// Create new user
userRouter.post('/users/create', async (req, res) => await createUser(req, res));

// Make user log-in
userRouter.post('/users/login', async (req, res) => await login(req, res));

export default userRouter;