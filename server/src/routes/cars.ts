import express, { Request, Response, Router } from 'express';
import cars from '../data/cars.json';
import validateTokenController from '../middlewares/validateToken/validateTokenController';

const carsRouter: Router = express.Router();
carsRouter.get('/', validateTokenController, (req: Request, res: Response) => {
  res.status(200).send(cars);
});
export default carsRouter;
