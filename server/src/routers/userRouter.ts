import * as express from 'express';
import {User} from '../models/user';
import {UserCRUD} from '../crud/UserCRUD';
import { AppCRUD } from '../crud/AppCRUD';

export const userRouter = express.Router();

// POST
userRouter.post('/api/signup', (req, res) => {
  const user = new User(req.body);
  AppCRUD.post(res, user);
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

userRouter.get('/api/users/:id', (req, res) => {
  AppCRUD.idGet(req, res, User);
});

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

// PATCH
 userRouter.patch('/api/users', (req, res) => {
  const allowedUpdates = ['name', 'email', 'password', 'description', 'following', 'followers', 'likes', 'age'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    res.status(400).send({
      error: 'Update is not permitted',
    });
  } else {
    const filter = req.query.id?{id: req.query.id.toString()}:{};
    AppCRUD.patch(req, res, filter, User);
  }
});

userRouter.patch('/api/users/:id', (req, res) => {
  const allowedUpdates = ['name', 'email', 'password', 'description', 'following', 'followers', 'likes', 'age'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    res.status(400).send({
      error: 'Update is not permitted',
    });
  }
  AppCRUD.idPatch(req, res, User);
});

// DELETE
userRouter.delete('/api/users', (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  }
  AppCRUD.delete(req, res, User);
});

userRouter.delete('/api/users/:id', async (req, res) => {
  AppCRUD.idDelete(req, res, User);
});