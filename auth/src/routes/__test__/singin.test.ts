import request from 'supertest';
import { app } from '../../app';

it('returns 400 with invalid email', async () => {
  await request(app).post('/api/users/signin').send({
    email: 'asdsdfsfs',
    password: '1234',
  });
});
it('returns 400 with invalid password', async () => {
  await request(app).post('/api/users/signin').send({
    email: 'test@test.com',
    password: '',
  });
});

it('fails when a email that does not exits is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'ali@ali.com',
      password: '1234',
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '1234',
    })
    .expect(201);
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '123sjdfhsdfk',
    })
    .expect(400);
});

it('response with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '1234',
    })
    .expect(201);
  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: '1234',
    })
    .expect(200);
  expect(response.get('Set-Cookie')).toBeDefined();
});
