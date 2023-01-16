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
  const filter = req.query.id?{_id: req.query.id.toString()}:{};
  AppCRUD.get(res, filter, Juice);
});

// GET Juices by User
juiceRouter.get('/api/juices/user', (req, res) => {
  const filter = req.query.userName?{userName: req.query.userName.toString()}:{};
  AppCRUD.get(res, filter, Juice);
});

// DELETE
juiceRouter.delete('/api/juices', (req, res) => {
  AppCRUD.delete(req, res, Juice);
});