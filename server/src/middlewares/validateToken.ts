import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  //lower cased because node lower case req headers
  const authHeader = req.headers['Authorization'.toLocaleLowerCase()];
  const token = authHeader && (authHeader as string).split(' ')[1];
  if (!token) return res.status(401).send('Access Denied');

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    next();
  } catch (err) {
    res.status(403).send('Invalid Token');
  }
};

export default validateToken;
