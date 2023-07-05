import express  from 'express';
import morgan from 'morgan';
import swaggerJsonDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import routesMeal from './src/routes/meals.routes';
import { options } from './src/docs/swaggerOptions';

const app = express();

const spect = swaggerJsonDoc(options);

app.use(morgan('dev'));

app.use('/api/meal', routesMeal);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(spect));

app.listen(4000, () => {
  console.log('Servidor corriendo en el puerto 4000');
});
