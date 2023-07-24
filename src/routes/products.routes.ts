import express from 'express';
import { createProducts, allProducts, imageProduct } from '../controllers/products.controller';
import checkAuth from '../middleware/auth';

const router = express.Router();

//publico
router.get('/all', allProducts);

// privado
router.post('/register',checkAuth , createProducts);
router.put('/image/:id/:colection', imageProduct);


//TODO: delete endpoint
//TODO: updated endpoint


/**
   * @swagger
   * /register:
   *   post:
   *     description: Register a products
   *     tags:
 *       - Sample
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the sample item to retrieve
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Sample item not found
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
