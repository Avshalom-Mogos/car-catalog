import express, { Request, Response, Router } from 'express';
import validateToken from '../middlewares/validateToken';
import Car from '../schemas/Car';

const carsRouter: Router = express.Router();
carsRouter.get('/', validateToken, async (req: Request, res: Response) => {
  try {
    const cars = await Car.find();
    res.status(200).send(cars);
  } catch (error) {
    res.status(500).send('something went wrong');
  }
});
export default carsRouter;
