import express from 'express';
import { createProducts, allProducts, imageProduct } from '../controllers/products.controller';

const router = express.Router();

router.post('/register', createProducts);
router.get('/all', allProducts);
router.put('/image/:id/:colection', imageProduct);

/**
   * @swagger
   * /register:
   *   post:
   *     description: Register a products
   *     responses:
   *       200:
   *         description: hello world
   */

/**
   * @swagger
   * /all:
   *   get:
   *     description:  Obtain all products
   *     responses:
   *       200:
   *         description: hello world
   */

/**
   * @swagger
   * /image/:id/:colection:
   *   put:
   *     description: Put image into product using a mongoId product
   *     responses:
   *       200:
   *         description: hello world
   */
export default router;
