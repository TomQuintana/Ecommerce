import { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt, {Secret} from 'jsonwebtoken';
import Product from '../models/product.model';
import { uploadFile } from '../services';

dotenv.config();

const secretToken: Secret = process.env.JWT_SECRET!;

const createProducts = async (req: any, res: any) => {

  //TODO: add more validation
  
  const {name, category, stock, price} = req.body;

  interface Product{
    name: string;
    category: string;
    stock: number;
    price: number;
    img: string;
  }

  const objProduct: Product = {
    name: name,
    category: category,
    stock: stock,
    price: price,
    img: ''
  };

  const token: string | undefined = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token' });
  }

  try {
    jwt.verify(token, secretToken);

    const productData = new Product(objProduct);
    const productSave = await productData.save();

    return res.status(200).json({ message: 
      productSave
    });

  } catch (err) {
    return res.status(500).json({ 
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

const imageProduct = async ( req: Request, res: Response) => {

  const {id, colection} = req.params;
  const product = await Product.findById(id);

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({msg:  'No files were uploaded.' });
    return;
  }

  try {
    const pathFile: any = await uploadFile(req.files, ['webp'], 'Products'); 
    product!.img = pathFile;

    const productSave = await product!.save();

    res.json({
      productSave 
    });   

  } catch (error) {
    res.status(500).json({ 
      error: 'An internal server error occurred.'
    });
  }
  
};

export {
  createProducts,
  allProducts,
  imageProduct
};
