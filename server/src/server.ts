/* eslint-disable @typescript-eslint/no-var-requires */
import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';
import helmet from 'helmet';

import routes from './routes';
import errorHandler from './errorHandler';

const app = express();
const server = require('http').Server(app);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use((request, response, next) => {
  request.io = io;
  next();
});

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(helmet());
app.use(errorHandler);

server.listen(process.env.APP_PORT, () =>
  console.log(`Server is running on port ${process.env.APP_PORT}!`),
);
