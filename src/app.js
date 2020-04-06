import express from 'express';
import userRouter from './routers/user.router.mjs';
import productRouter from './routers/product.router.mjs';
import cartRouter from './routers/cart.router.mjs';
const port = process.env.PORT;
import * as DB from './db/db.mjs';

const app = express();

// Make JSON parsing available from clint-server/server-client
app.use(express.json());

// Entrypoint to consume the routes available in the system
app.use(userRouter);
app.use(productRouter);
app.use(cartRouter);

// Export app in only TEST env, stop listing to any port in TEST env to resolve the issue of EADDRINUSE while running multiple tests
(process.env.NODE_ENV !== 'test') ?
  app.listen(port, () => { console.log(`Server running on port ${port}`) })
  : module.exports = app;