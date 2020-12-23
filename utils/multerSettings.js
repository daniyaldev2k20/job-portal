const path = require('path');
const multer = require('multer');
const AppError = require('./appError');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resume');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `resume-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext === '.pdf') {
    cb(null, true);
  } else {
    cb(new AppError('Only documents are allowed', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: 2 * 1014 * 1024,
});

module.exports = upload;
