import * as build from './build';// Import default export from index.js
import { createRequestHandler } from '@remix-run/vercel';

export default createRequestHandler({ build, mode: process.env.NODE_ENV });
