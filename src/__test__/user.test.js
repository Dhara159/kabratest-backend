const mongoose = require('mongoose');
const app = require('./../app');
const supertest = require('supertest');
const request = supertest(app);

describe('Test user endpoints', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });

  it('is creating new user', async (done) => {
    const userData = {
      name: 'jesta',
      email: 'jesta@jest.com',
      password: 'jest'
    }
    const res = await request.post('/users/create').send(userData);
    if (res.status === 201) {
      expect.assertions(2);
      expect(res.text).toContain('user');
      expect(res.text).toContain('token');
    }
    else {
      expect.assertions(1);
      expect(res.status).toBe(400);
    }
    done();
  });

  it('is valid login', async (done) => {
    const userData = {
      email: 'jest@jest.com',
      password: 'jest'
    }
    const res = await request.post('/users/login').send(userData);
    expect.assertions(3);
    expect(res.status).toBe(201);
    expect(res.text).toContain('user');
    expect(res.text).toContain('token');
    done();
  });

  it('is unknown user', async (done) => {
    const userData = {
      email: 'harrypotter',
      password: '123'
    }
    const res = await request.post('/users/login').send(userData);
    expect.assertions(2);
    expect(res.status).toBe(400);
    expect(res.text).toContain('error');
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
})