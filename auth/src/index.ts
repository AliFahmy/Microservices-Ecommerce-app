import mongoose from 'mongoose';
import { app } from './app';
import { DatabaseConnectionError } from '@ticketsmarche/common';

const start = async () => {
  const { MONGO_URI, JWT_KEY } = process.env;
  if (!JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  try {
    await mongoose.connect(MONGO_URI);
  } catch {
    throw new DatabaseConnectionError();
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
};
start();
