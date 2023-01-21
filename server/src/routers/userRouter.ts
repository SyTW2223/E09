import * as express from 'express';
import {User} from '../models/user';
import {UserCRUD} from '../crud/UserCrud';
import { AppCRUD } from '../crud/AppCrud';

export const userRouter = express.Router();

// POST
userRouter.post('/api/signup', (req, res) => {
  const user = new User(req.body);
  UserCRUD.postSignUp(res, user);
});

userRouter.post('/api/signin', (req, res) => {
  UserCRUD.postSignIn(res, req, User);
});

userRouter.post('/api/password-reset', (req, res) => {
  UserCRUD.postPasswordReset(res, req, User);
});

// GET
userRouter.get('/api/user', (req, res) => {
  UserCRUD.getLoggedUser(req, res);
});

userRouter.get('/api/users', (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};
  AppCRUD.get(res, filter, User);
});

userRouter.get('/api/followers', (req, res) => {
  UserCRUD.getFollowers(req, res, User);
});

// PATCH
userRouter.patch('/api/password-reset', (req, res) => {
  const allowedUpdates = ['password'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    res.status(400).send({
      error: 'Update is not permitted',
    });
  } else {
    UserCRUD.patchPassword(req, res, User);
  }
});

 userRouter.patch('/api/users', (req, res) => {
  const allowedUpdates = ['name', 'email', 'password', 'following'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    res.status(400).send({
      error: 'Update is not permitted',
    });
  } else {
    if (!req.query.id) {
      res.status(400).send({
        error: 'An id must be provided',
      });
    }
    AppCRUD.patch(req, res, User);
  }
});



// DELETE
userRouter.delete('/api/users', (req, res) => {
  if (!req.query.id) {
    res.status(400).send({
      error: 'An id must be provided',
    });
  }
  UserCRUD.delete(req, res, User);
});