require('dotenv').config();
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user'
import { validateEnv } from './types/validateEnv';
import morganMiddleware from './config/morganMiddleware';

const app = express();
const port = validateEnv.PORT || 4005;

app.use(express.json());
app.use(cookieParser());
app.use(morganMiddleware);

app.use('/api/user', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Olá, mundo!');
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

