import * as express from 'express';
import './db/mongoose';
import {userRouter} from './routers/userRouter';
import {defaultRouter} from './routers/default';
import {juiceRouter} from './routers/juiceRouter';
const cors = require('cors');

/**
 * Creamos el servidor
 * 'app' variable de tipo Express
 */
export const app = express();
app.use(cors({origin: 'https://sytw2223.github.io'}));

/**
 * Parsea el cuerpo de la petición
 */
app.use(express.json());

/**
 * Llamadas a las rutas
 */
app.use(userRouter);
app.use(juiceRouter);
app.use(defaultRouter);