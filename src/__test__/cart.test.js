const mongoose = require('mongoose');
const app = require('./../app');
const supertest = require('supertest');
const request = supertest(app);

describe('Test product endpoints', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });

  it('is throwing error when user is not logged in', async (done) => {
    const res = await request.get('/cart');

    expect.assertions(3);
    expect(res.status).toBe(401);
    expect(res.text).toContain('error');
    expect(res.body.error).toBe('Not authorized to access this resource')
    done();
  });

  it('is fetching user\'s cart', async (done) => {
    const res = await request.get('/cart').set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZThhMmYwOGZjMzIyOTIxMDBkM2Q0YzgiLCJpYXQiOjE1ODYxNTQ0MDF9.DmKpJU8lInXvGA-KCLn7jPBwCAx2drQlh8k3L_tVwoE');

    expect.assertions(2);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    done();
  });

  it('is adding new item to cart', async (done) => {
    const newItem = {
      id: 4,
      name: 'Grey Brim',
      imageUrl: 'https://i.ibb.co/RjBLWxB/grey-brim.png',
      price: 25,
      description: 'Police typically wear distinctive hats such as peaked caps or brimmed hats, such as those worn by the Royal Canadian Mounted Police.'
    };
    const res = await request.post('/cart/update').set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZThhMmYwOGZjMzIyOTIxMDBkM2Q0YzgiLCJpYXQiOjE1ODYxNTQ0MDF9.DmKpJU8lInXvGA-KCLn7jPBwCAx2drQlh8k3L_tVwoE').send(newItem);
    const countedTotal = res.body.items.reduce((accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity * cartItem.price, 0);

    expect.assertions(6);
    expect(res.status).toBe(200);
    expect(res.text).toContain('total');
    expect(res.text).toContain('userId');
    expect(res.text).toContain('items');
    expect(res.body.items.length).toBeGreaterThanOrEqual(1);
    expect(res.body.total).toBe(countedTotal)
    done();
  })

  afterAll(async () => {
    await await mongoose.connection.close((err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });
});
