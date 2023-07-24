import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

interface ISeller {
  name: string;
  email: string;
  password: string
}

const SellerSchema = new Schema<ISeller>({
  name: { 
    type: String, 
    required: true 
  },
  email: {
    type: String,
    require: false
  },
  password: {
    type: String,
    require: true
  }
});

SellerSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


export default model('Seller', SellerSchema);
