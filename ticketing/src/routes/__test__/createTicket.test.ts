import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
it('has a route handler listening to /api/tickets for post requests', async () => {
  const response = await request(app).post('/api/ticketing').send({});
  expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  const response = await request(app).post('/api/ticketing').send({});
  expect(response.status).toEqual(401);
});

it('returns a success if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/ticketing')
    .set('Cookie', global.signin())
    .send({});
  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/ticketing')
    .set('Cookie', global.signin())
    .send({
      title: '',
      price: 10,
    })
    .expect(400);

  await request(app)
    .post('/api/ticketing')
    .set('Cookie', global.signin())
    .send({
      price: 10,
    })
    .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
  await request(app)
    .post('/api/ticketing')
    .set('Cookie', global.signin())
    .send({
      title: 'sdsff',
      price: -10,
    })
    .expect(400);
  await request(app)
    .post('/api/ticketing')
    .set('Cookie', global.signin())
    .send({
      title: 'sdsff',
    })
    .expect(400);
  await request(app)
    .post('/api/ticketing')
    .set('Cookie', global.signin())
    .send({
      title: 'sdsff',
      price: 'sdhjsdfh',
    })
    .expect(400);
});

it('creates a new ticker with valid input', async () => {
  //add in a check to make sure a ticket was saved to DB
  let tickets = await Ticket.count({});
  expect(tickets).toEqual(0);
  const title = 'amr diab concert';
  const documents = await request(app)
    .post('/api/ticketing')
    .set('Cookie', global.signin())
    .send({
      title,
      price: 500,
    })
    .expect(201);
  tickets = await Ticket.count({});
  expect(tickets).toEqual(1);
});
