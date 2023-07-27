const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const { nanoid } = require('nanoid');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const filename = nanoid();

    let folder = 'default';

    if (req.baseUrl === '/api/users') {
      folder = 'users';
    } else if (req.baseUrl === '/api/pets' || req.baseUrl === '/api/notices') {
      folder = 'pets';
    }

    return {
      folder: folder,
      allowed_formats: ['jpg', 'png'],
      public_id: filename,
      transformation: [
        { width: 350, height: 350 },
        { width: 700, height: 700 },
      ],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
