import express, { Application, Request, Response } from 'express';
import path from 'path';
import cars from './data/cars.json';

const app: Application = express();
const port: string | number = process.env.PORT || 5000;

app.get('/cars', (req: Request, res: Response) => {
  res.status(200).send(cars);
});

//deployment
if (process.env.NODE_ENV === 'production') {
  const root: string = path.join(__dirname, '..', '..', 'client', 'build');
  app.use(express.static(root));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile('index.html', { root });
  });
}

app.listen(port, () => console.log(`server is up on port: ${port}.`));
