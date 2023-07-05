import express, { Router } from 'express';
import { test } from '../controllers/meal.controller';

const router = express.Router();

router.get('/register', test);
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
