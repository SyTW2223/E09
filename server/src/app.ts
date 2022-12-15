import * as express from 'express';
import './db/mongoose';
import {userRouter} from './routers/userRouter';
import {defaultRouter} from './routers/default';
const cors = require('cors');

/**
 * Creamos el servidor
 * 'app' variable de tipo Express
 */
export const app = express();
app.use(cors({origin: 'http://localhost:8080'}));

/**
 * Parsea el cuerpo de la petición
 */
app.use(express.json());

/**
 * Llamadas a las rutas
 */
app.use(userRouter);
app.use(defaultRouter);