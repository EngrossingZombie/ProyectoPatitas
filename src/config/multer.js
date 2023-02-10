'use strict';
const multer = require('multer');
const uuid = require('uuid-v4');
const path = require('path');

const storage = multer.diskStorage({
    // Ruta de almacén de imágenes  
    destination: './src/public/uploads',
      filename: (req, file, cb, filename) => {
          cb(null, uuid() + path.extname(file.originalname));
    }
});
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' 
        || file.mimetype === 'image/jpeg'){
            cb(null, true);
        }else {
            cb(null, false);
        }
}

const upload = multer({storage: storage, fileFilter: filefilter});

module.exports = {upload}