import jwt from 'jsonwebtoken';

const validateMyAppToken = (accessToken: string): boolean => {
  try {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);
    return true;
  } catch (err) {
    return false;
  }
};
export default validateMyAppToken;
