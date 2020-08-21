import {
  validateFacebookToken,
  validateMyAppToken,
} from './validateTokenFunctions';
import { NextFunction, Request, Response } from 'express';

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //lower cased because node lower case req headers
  const authProvider = req.headers['authProvider'.toLocaleLowerCase()];
  const authHeader = req.headers['Authorization'.toLocaleLowerCase()];
  const accessToken = authHeader && (authHeader as string).split(' ')[1];
  if (!accessToken) return res.status(401).send('Access Denied');

  const validateProviderFunctions: {
    myApp: Function;
    facebook: Function;
    [key: string]: any;
  } = {
    myApp: validateMyAppToken,
    facebook: validateFacebookToken,
  };

  try {
    const validationFn = validateProviderFunctions[authProvider as string];
    const isValid = await validationFn(accessToken);
    if (isValid) next();
    else res.status(400).send('Invalid ');
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

export default validateToken;
