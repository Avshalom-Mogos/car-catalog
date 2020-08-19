import keys from '../../private/keys.json';
import { validateFacebookToken } from './validateFacebookToken';
import { validateMyAppToken } from './validateMyAppToken';
import { NextFunction, Request, Response } from 'express';

export const validateTokenController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authProvider, token } = req.params;

  if (authProvider === 'myApp') {
    validateMyAppToken(req, res, next);
  }
  if (authProvider === 'facebook') {
    validateFacebookToken(token, keys, next);
  }
};
