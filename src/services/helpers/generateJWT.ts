import jwt, { Secret } from 'jsonwebtoken';

const generateToken = (payload: string | object | Buffer, secret: Secret, expiresIn: string): string => {
  if (secret === 'error') {
    throw new Error; 
  }
  return jwt.sign(payload, secret, { expiresIn });
};

export {
  generateToken
};
