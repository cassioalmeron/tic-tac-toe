import multer from 'multer';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const imagesFolder = path.resolve(__dirname, '..', '..', 'images');

export default {
  tmpFolder,
  imagesFolder,

  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'tmp'),
    filename: (request, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
};
