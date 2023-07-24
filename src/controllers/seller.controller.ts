import { Request, Response} from 'express';
import {Secret} from 'jsonwebtoken';
import dotenv from 'dotenv';
import { generateToken } from '../services/helpers/generateJWT';
import Seller from '../models/seller.model';

dotenv.config();

const secretToken: Secret = process.env.JWT_SECRET !== undefined ? process.env.JWT_SECRET : 'error';

const sellerLogin = async (req: Request, res: Response) => {
  let sellerResponse;

  const {email, user_id, name, password} = req.body;

  if(user_id === process.env.USER_ID) {
    const existEmail = await Seller.findOne({ email });

    if (!existEmail) {
      try {
        const sellerBody = {
          email,
          name,
          password
        };

        const seller = new Seller(sellerBody);
        await seller.save();

      } catch (error) {
        //NOTE: declare error
        console.log(error)
      }
    }

    const seller = await Seller.findOne({email});
    sellerResponse = seller;

    const payload = { userId: user_id };
    const token = generateToken(payload, secretToken, '1h');

    return res.json({
      sellerResponse,
      token
    });
  }

  return res.status(400).json({
    msg: 'You dont have permition'
  });
};


const autenticar = async (req:any , res:any) => {
  const {email } = req.body;

  const usuario = await Seller.findOne({email});


  const payload = { userId: usuario!._id};
  const tokenNew = generateToken(payload, secretToken, '1h' );
  console.log(tokenNew);
  

  res.json({
    _id: usuario!._id,
    nombre: usuario!.name,
    email: usuario!.email,
    token: tokenNew
  });
};

//const payload = { userId: '123456789' };
// console.log(generateToken(payload, secretToken, '1h'))

export {
  sellerLogin,
  autenticar
};
