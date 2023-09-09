import ErrorHandler from './middleware/ErrorHandler';
import { json } from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import { api } from './api';
import cors from 'cors';
import path from 'path';

export const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use(json({ limit: 10485760 }));

// test config for express-session
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use('/v1', api);

app.use(ErrorHandler);
