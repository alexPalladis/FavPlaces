const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../util/cloudinary'); 

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        allowed_formats: ['jpeg', 'png', 'jpg'], 
    },
});

const fileUpload = multer({ storage: storage });

module.exports = fileUpload;
