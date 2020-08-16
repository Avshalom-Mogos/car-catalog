import express, { Request, Response, Router } from 'express';
const router: Router = express.Router();
import cars from '';


router.get('/', (req: Request, res: Response) => {
  res.status(200).send(cars);
});

module.exports = router;
