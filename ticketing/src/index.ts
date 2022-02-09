import express from 'express';
import mongoose from 'mongoose';
import { DatabaseConnectionError } from '@ticketsmarche/common';
import { app } from './app';
const start = async () => {
  const { JWT_KEY, MONGO_URI } = process.env;
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
    console.log('ticketing srv');
  });
};

start();
