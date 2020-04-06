import express from 'express';

import auth from './../middleware/auth.mjs';
import { fetchCart, addOrUpdateCartItem } from './../controllers/cart.controller.mjs';

const cartRouter = express.Router();

// Available endpoint for Cart related operations

// Fetch cart for user, use "auth" to make the route accessible to only logged in users
cartRouter.get('/cart', auth, async (req, res) => await fetchCart(req, res));

// Add/Update items in cart
cartRouter.post('/cart/update', auth, async (req, res) => await addOrUpdateCartItem(req, res));

export default cartRouter;

