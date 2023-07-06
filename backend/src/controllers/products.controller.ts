import fs from 'fs';
import { Request, Response } from 'express';
import Product from '../models/product.model'
import productModel from '../models/product.model';

const createProducts = async (req: any, res: any) => {
  const productData = new Product(req.body)

  try {
    const productSave = await productData.save()
    return res.json({
      productSave
    })

  } catch (error) {
    res.status(500).json({ 
      error: 'An internal server error occurred.'
    });
  }
};

const allProducts = async ( req: Request, res: Response) => {
  
  const products = await Product.find(); 

  return res.status(200).json({
    products
  });
};

export {
  createProducts,
  allProducts
};
