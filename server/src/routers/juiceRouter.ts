import * as express from 'express';
import {Juice} from '../models/juice';
import {JuiceApiCRUD} from '../JuiceApiCRUD';

export const juiceRouter = express.Router();

// POST
juiceRouter.post('/api/juice', (req, res) => {
  const juice = new Juice(req.body);
  JuiceApiCRUD.postJuice(res, juice);
});