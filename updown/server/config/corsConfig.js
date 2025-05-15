import cors from 'cors';
import { CLIENT_URL } from './envConfig.js';

export const corsMiddleware = cors({
  origin: CLIENT_URL,
  credentials: true
});