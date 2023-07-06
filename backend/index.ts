import express  from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan';
import swaggerJsonDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import routesProduct from './src/routes/products.routes';
import { options } from './src/docs/swaggerOptions';
import conectarDB from './src/config/connectDb';

const app = express();
app.use(express.json());

const spect = swaggerJsonDoc(options);

dotenv.config();
conectarDB()

app.use(morgan('dev'));

app.use('/api/products', routesProduct);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(spect));

app.listen(4000, () => {
  console.log('Servidor corriendo en el puerto 4000');
});
