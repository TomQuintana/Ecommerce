import express from 'express';
import { sellerLogin, autenticar } from '../controllers/seller.controller';

const router = express.Router();

router.post('/login', sellerLogin);
//router.post('/autenticar', autenticar)

export default router;
