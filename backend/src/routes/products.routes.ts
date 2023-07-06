import express, { Router } from 'express';
import { createProducts, allProducts } from '../controllers/products.controller';

const router = express.Router();

router.post('/register', createProducts);
router.get('/all', allProducts);

/**
   * @swagger
   * /register:
   *   get:
   *     description: Register a new meals
   *     responses:
   *       200:
   *         description: hello world
   */
export default router;
