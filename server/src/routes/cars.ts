import express, { Request, Response, Router } from 'express';
import cars from '../data/cars.json';
export const  carsRouter: Router = express.Router();

carsRouter.get('/', (req: Request, res: Response) => {
  res.status(200).send(cars);
});

