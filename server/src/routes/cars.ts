import express, { Request, Response, Router } from 'express';
import Car from '../schemas/Car';
import validateToken from '../middlewares/validateToken';

const carsRouter: Router = express.Router();
carsRouter.get('/', validateToken, (req: Request, res: Response) => {
  Car.find({}, (err, cars) => {
    if (err) return res.status(500).send('somthing went wrong');
    res.status(200).send(cars);
  });
});
export default carsRouter;
