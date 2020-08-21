import express, { Request, Response, Router } from 'express';
import cars from '../data/cars.json';
import validateToken from '../middlewares/validateToken/validateToken';

const carsRouter: Router = express.Router();
carsRouter.get('/', validateToken, (req: Request, res: Response) => {
  res.status(200).send(cars);
});
export default carsRouter;
