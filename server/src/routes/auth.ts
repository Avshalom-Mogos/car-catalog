import bcrypt from 'bcrypt';
import User from '../schemas/User';
import jwt from 'jsonwebtoken';
import express, { Request, Response, Router } from 'express';

const authRouter: Router = express.Router();

authRouter.post('/signup', (req: Request, res: Response) => {
  const { name, email, password, authProvider } = req.body;

  //check if the user exist in the db
  User.findOne({ email }, (err, user) => {
    if (err) return res.status(400).send(err);
    if (!user) {
      //hash password
      bcrypt
        .hash(password, 10)
        .then(hashedPassword => {
          //create user
          const user = new User({
            name,
            email,
            authProvider,
            password: hashedPassword,
          });
          user
            .save()
            .then(newUser => res.status(201).send(newUser))
            .catch(err => res.status(400).send(err));
        })
        .catch(err => res.status(400).send(err));
    } else {
      return res.status(400).send('This email is taken by another account');
    }
  });
});

authRouter.post('/signin', (req, res) => {
  const { email, password } = req.body;
  //check if the user exists in the db
  User.findOne({ email }, (err, user) => {
    if (err) return res.status(400).send(err);
    if (user) {
      const { name, id, email, authProvider } = user;
      //check if password is correct
      bcrypt
        .compare(password, user.password as string)
        .then(result => {
          if (result) {
            //create and assign token
            const accessToken = jwt.sign(
              { _id: id },
              process.env.ACCESS_TOKEN_SECRET as string
            );
            res
              .status(200)
              .send({ name, id, email, authProvider, accessToken });
          } else {
            return res.status(403).send('incorrect password or email');
          }
        })
        .catch(err => res.status(500).send('something went wrong'));
    } else {
      return res.status(400).send('incorrect password or email');
    }
  });
});

authRouter.post('/soical', (req: Request, res: Response) => {
  const user = req.body;
  User.findOne({ userProviderId: user.userProviderId }).then(userFound => {
    if (userFound) {
      //return the user to client
      res.status(200).send(userFound);
    } else {
      //if not found create user in the db
      new User({ ...user }).save().then(newUser => {
        res.status(200).send(newUser);
      });
    }
  });
});

export default authRouter;
