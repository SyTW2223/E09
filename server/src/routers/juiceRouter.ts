import * as express from 'express';
import { AppCRUD } from '../crud/AppCRUD';
import { Juice } from '../models/juice';

export const juiceRouter = express.Router();

// POST
juiceRouter.post('/api/juice', (req, res) => {
  const juice = new Juice(req.body);
  AppCRUD.post(req, res, juice);
});

// GET
juiceRouter.get('/api/juices', (req, res) => {
  const filter = req.query.id?{name: req.query.id.toString()}:{};
  AppCRUD.get(res, filter, Juice);
});

// PATCH
juiceRouter.patch('/api/juice/like', (req, res) => {
  const allowedUpdates = ['likes'];
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
    AppCRUD.patch(req, res, Juice);
  }
});

// DELETE
juiceRouter.delete('/api/juices', (req, res) => {
  AppCRUD.delete(req, res, Juice);
});