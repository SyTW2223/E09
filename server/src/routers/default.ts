/* eslint-disable new-cap */
import * as express from 'express';

export const defaultRouter = express.Router();

/**
 * Ruta por defecto
 */
defaultRouter.all('*', (_, res) => {
  res.status(501).send();
});