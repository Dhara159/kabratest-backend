import express from 'express';

import { fetchAllProducts } from './../controllers/product.controller.mjs';

const productRouter = express.Router();

// Available endpoint for Product related operations

// Fetch all products, "auth" middleware is not used here coz listing should be availabe for all users (logged-in/non-logged-in)
productRouter.get('/products', async (_, res) => await fetchAllProducts(res));

export default productRouter;