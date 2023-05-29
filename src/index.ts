require('dotenv').config();
import express, { Request, Response } from 'express';
import userRoutes from '../src/routes/user'
import { validateEnv } from './types/validateEnv';
import cookieParser from 'cookie-parser';


const app = express();
const port = validateEnv.PORT || 4005;

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Olá, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

