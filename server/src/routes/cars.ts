import express, { Request, Response, Router } from 'express';
import cars from '../data/cars.json';
const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).send(cars);
});

module.exports = router;