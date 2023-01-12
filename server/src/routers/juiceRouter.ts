import * as express from 'express';
import {Juice} from '../models/juice';
import {JuiceCRUD} from '../crud/JuiceCRUD';

export const juiceRouter = express.Router();

// POST
juiceRouter.post('/api/juice', (req, res) => {
  const juice = new Juice(req.body);
  JuiceCRUD.postJuice(res, juice);
});