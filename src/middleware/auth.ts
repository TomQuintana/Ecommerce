import jwt, {Secret} from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import Product from '../models/product.model';

dotenv.config();

const secretToken: Secret = process.env.JWT_SECRET !== undefined ? process.env.JWT_SECRET : 'error';

const checkAuth = async (req: Request, res: Response, next: any) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, secretToken);
      console.log(decoded);
      

      return next(); 

    } catch (error) {
      const e = new Error('Token no valido ');
      return res.status(403).json({msg: e.message});   
    }
  }  

  if(!token) {
    const error = new Error('Token no valido o inexistente');
    res.status(403).json({msg: error.message});
  }

  next();
};

export default checkAuth; 
