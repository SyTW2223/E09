import * as express from 'express';
import {User} from '../models/user';
import {JuicerApiCRUD} from '../JuicerApiCRUD';

export const userRouter = express.Router();

// POST
userRouter.post('/api/users', (req, res) => {
  const user = new User(req.body);
  JuicerApiCRUD.post(res, user);
});

// GET
userRouter.get('/api/users', (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};
  JuicerApiCRUD.get(res, filter, User);
});

userRouter.get('/api/users/:id', (req, res) => {
  JuicerApiCRUD.idGet(req, res, User);
});

// PATCH
 userRouter.patch('/api/users', (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  }
  const allowedUpdates = ['name', 'email', 'password', 'description', 'following', 'followers', 'likes', 'age'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    res.status(400).send({
      error: 'Update is not permitted',
    });
  }
  JuicerApiCRUD.patch(req, res, User);
});

/**
 * Actualiza la canción por id
 */
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
  JuicerApiCRUD.idPatch(req, res, User);
});

// DELETE
userRouter.delete('/api/users', (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  }
  JuicerApiCRUD.delete(req, res, User);
});

userRouter.delete('/api/users/:id', async (req, res) => {
  JuicerApiCRUD.idDelete(req, res, User);
});