import * as express from 'express';
import {User} from '../models/user';
import {UserApiCRUD} from '../UserApiCRUD';

export const userRouter = express.Router();

// POST
userRouter.post('/api/signup', (req, res) => {
  const user = new User(req.body);
  UserApiCRUD.postSignUp(res, user);
});

userRouter.post('/api/signin', (req, res) => {
  UserApiCRUD.postSignIn(res, req, User);
});

userRouter.post('/api/password-reset', (req, res) => {
  UserApiCRUD.postPasswordReset(res, req, User);
});

// GET
userRouter.get('/api/user', (req, res) => {
  UserApiCRUD.getUser(req, res);
});

userRouter.get('/api/users', (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};
  UserApiCRUD.get(res, filter, User);
});

/*
userRouter.get('/api/users/:id', (req, res) => {
  UserApiCRUD.idGet(req, res, User);
});*/

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
    UserApiCRUD.patch(req, res, User);
  }
});

/*
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
  UserApiCRUD.idPatch(req, res, User);
});
*/
// DELETE
userRouter.delete('/api/users', (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  }
  UserApiCRUD.delete(req, res, User);
});

userRouter.delete('/api/users/:id', async (req, res) => {
  UserApiCRUD.idDelete(req, res, User);
});