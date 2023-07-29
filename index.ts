import express  from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerJsonDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import routesProduct from './src/routes/products.routes';
import routesSeller from './src/routes/seller.routes';
import { options } from './src/docs/swaggerOptions';
import conectarDB from './src/config/connectDb';

const app = express();
app.use(express.json());

const spect = swaggerJsonDoc(options);

dotenv.config();
conectarDB();

app.use(morgan('dev'));

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/',
  createParentPath: true
}));

const whitelist = ['http://localhost:5173'];
const corsOptions = {
  origin: function (origin:any, callback:any) {
    //TODO: mejorar el tipado de origin y callback
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

app.use('/api/products', routesProduct);
app.use('/api/seller', routesSeller);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(spect));

app.listen(`${process.env.PORT}`, () => {
  console.log('Servidor corriendo en el puerto', process.env.PORT);
});
