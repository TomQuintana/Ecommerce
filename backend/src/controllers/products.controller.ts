import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import {dirname, join} from 'path'
import Product from '../models/product.model'
import productModel from '../models/product.model';
import { uploadFile } from '../services';

const createProducts = async (req: any, res: any) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({msg:  'No files were uploaded.' });
    return;
  }

  const pathFile = await uploadFile(req.files, ['jpeg'], 'Products') 

  res.json({
    msg: pathFile
  })



}
  //const productData = new Product(req.body)

  // try {
  //   const productSave = await productData.save()
  //   return res.json({
  //     productSave
  //   })
  //
  // } catch (error) {
  //   res.status(500).json({ 
  //     error: 'An internal server error occurred.'
  //   });
  // }
 
//};

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
