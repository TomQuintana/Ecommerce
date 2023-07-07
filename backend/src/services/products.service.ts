import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import {dirname, join} from 'path';

const uploadFile = (files:any, extentionValid = ['jpeg', 'jpg'], folder = '') => {

  return new Promise( (resolve, reject) => {
    const {file} = files;

    const nameSplited = file.name.split('.');
    const extention = nameSplited[nameSplited.length - 1];

    if(!extentionValid.includes(extention)) {
      return reject(`Extention ${extention} is not valid`);
    }

    const nameTemp = uuidv4() + '.' + extention;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const uploadPath = join(__dirname, '../uploads/', folder, nameTemp);

    file.mv(uploadPath, (err: any) => {
      if (err) {
        return reject(err);
      }
      resolve(nameTemp);
    }); 
  });

};

export {
  uploadFile
};
