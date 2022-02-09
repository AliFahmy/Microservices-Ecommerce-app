import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  function signin(): string[];
}
let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdf';
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  //build a jwt payload {id,email}
  const payload = {
    id: 'temid',
    email: 'ali@ali.com',
  };
  //create the jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  //build session object {jwt:myjwt}
  const session = { jwt: token };
  // turn session into JSON
  const sessionJSON = JSON.stringify(session);
  //take json and encode it as base64 for cookie
  const base64 = Buffer.from(sessionJSON).toString('base64');
  //return a string with the encoded data
  return [`session=${base64}`];
};
