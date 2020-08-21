import express, { Application, Request, Response } from 'express';
import carsRouter from './routes/cars';
import authRouter from './routes/auth';
import mongoose from 'mongoose';
import path from 'path';
import { config } from 'dotenv';

const app: Application = express();
const port: string | number = process.env.PORT || 5000;

app.use(express.json());
config();

//database
mongoose
  .connect(process.env.DB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to the DB.'))
  .catch(err => console.error(err));

//routes
app.use('/cars', carsRouter);
app.use('/auth', authRouter);

//deployment
if (process.env.NODE_ENV === 'production') {
  const root: string = path.join(__dirname, '..', '..', 'client', 'build');
  app.use(express.static(root));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile('index.html', { root });
  });
}

app.listen(port, () => console.log(`server is up on port: ${port}.`));
