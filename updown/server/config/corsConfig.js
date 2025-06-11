import cors from 'cors';
import { CLIENT_DEV_URL, CLIENT_URL } from './envConfig.js';

export const corsMiddleware = cors({
  origin: [CLIENT_URL, CLIENT_DEV_URL],
  // origin: CLIENT_DEV_URL,
  credentials: true
});