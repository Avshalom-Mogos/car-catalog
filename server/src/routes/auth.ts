import bcrypt from 'bcrypt';
import User from '../schemas/User';
import jwt from 'jsonwebtoken';
import express, { Request, Response, Router } from 'express';

const authRouter: Router = express.Router();

authRouter.post('/signup', (req: Request, res: Response) => {
  const { name, email, password, authProvider } = req.body;

  //check if the user exist in the db
  User.findOne({ email }, (err, user) => {
    if (err) return res.status(500).send('something went wrong');
    if (user) {
      return res.status(400).send('This email is taken by another account');
    }

    //hash password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).send('something went wrong');
      //  create user
      const user = new User({
        name,
        email,
        authProvider,
        password: hashedPassword,
      });
      user.save((err, newUser) => {
        if (err) return res.status(500).send('something went wrong');
        res.status(201).send(newUser);
      });
    });
  });
});

authRouter.post('/signin', (req, res) => {
  const { email, password } = req.body;
  //check if the user exists in the db
  User.findOne({ email }, (err, userFound) => {
    if (err) return res.status(500).send('something went wrong');
    if (!userFound) return res.status(400).send('incorrect email or passowrd');

    const { name, _id, email, authProvider } = userFound;
    if (authProvider !== 'myApp') {
      return res.status(403).send(`Wrong login method`);
    }

    //check if password is correct
    bcrypt.compare(password, userFound.password as string, (err, same) => {
      if (err) return res.status(500).send('something went wrong');
      if (!same) return res.status(403).send('incorrect email or passowrd');
      //send ther user
      res.status(200).send({
        _id,
        name,
        email,
        authProvider,
        token: createToken(_id),
      });
    });
  });
});

authRouter.post('/soical', (req: Request, res: Response) => {
  const user = req.body;
  User.findOne({ userProviderId: user.userProviderId }, (err, userFound) => {
    if (err) return res.status(400).send(err);

    if (userFound) {
      //  return the user to client with a token
      res
        .status(200)
        .send({ ...userFound._doc, token: createToken(userFound._id) });
    } else {
      //  if not found create user in the db and
      new User(user).save((err, newUser) => {
        if (err) return res.status(400).send(err);
        res
          .status(201)
          .send({ ...newUser._doc, token: createToken(newUser._id) });
      });
    }
  });
});

//helpers
function createToken(id: string) {
  const token = jwt.sign(
    { _id: id },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: '3d' }
  );
  return token;
}

export default authRouter;
