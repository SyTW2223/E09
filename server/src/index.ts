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

/**
 * Puerto del servidor
 */
export const port = process.env.PORT || 3000;

/**
 * Muestra por consola el puerto en el que está escuchando
 */
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});