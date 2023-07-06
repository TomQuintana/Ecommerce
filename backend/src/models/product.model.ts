import { Schema, model } from 'mongoose';

interface IUser {
  name: string;
  category: string;
  stock: number;
  price: number;
  image: string;
}

const ProductSchema = new Schema<IUser>({
  name: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: false 
  },
  stock : { 
    type: Number, 
    required: true 
  },
  price: {
    type: Number,
    required: true  
  },
  image: {
    type: String,
    require: false
  }
});

export default model('Product-Stored', ProductSchema);
