import express, { Request, Response, Router } from 'express';
import validateToken from '../middlewares/validateToken';
import Car from '../schemas/Car';

const carsRouter: Router = express.Router();
carsRouter.get('/', validateToken, (req: Request, res: Response) => {
  Car.find((err, cars) => {
    if (err) return res.status(500).send('something went wrong');
    res.status(200).send(cars);
  });
});
export default carsRouter;
