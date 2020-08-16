import express, { Application, Request, Response } from 'express';
import { carsRouter } from './routes/cars';
import path from 'path';

const app: Application = express();
const port: string | number = process.env.PORT || 5000;


//routes
app.use('/cars', carsRouter);

//deployment
if (process.env.NODE_ENV === 'production') {
  const root: string = path.join(__dirname, '..', '..', 'client', 'build');
  app.use(express.static(root));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile('index.html', { root });
  });
}

app.listen(port, () => console.log(`server is up on port: ${port}.`));
