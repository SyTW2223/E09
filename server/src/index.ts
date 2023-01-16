import { app } from './app'

/**
 * Puerto del servidor
 */
const port = process.env.PORT || 3000;

/**
 * Muestra por consola el puerto en el que está escuchando
 */
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});