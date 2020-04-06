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

  it('is fetching all products', async (done) => {
    const res = await request.get('/products');
    expect.assertions(2);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    done();
  });

  afterAll(async () => {
    await await mongoose.connection.close((err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });
});
