const { nanoid } = require('nanoid');
const Candidate = require('../models/Candidate');
const upload = require('../utils/multerSettings');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.uploadCandidateResume = upload.single('resume');

exports.createCandidate = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('No resume uploaded', 404));
  }

  const resume = req.file.filename;
  const {
    name,
    currentAddress,
    city,
    province,
    zipCode,
    email,
    phone,
    position,
  } = req.body;

  const token = nanoid(6);

  const newCandidate = await Candidate.create({
    name,
    currentAddress,
    city,
    province,
    zipCode,
    email,
    phone,
    position,
    token,
    resume,
  });

  res.status(201).json({
    status: 'success',
    data: {
      candidate: newCandidate,
    },
  });
});

exports.editCandidate = catchAsync(async (req, res, next) => {
  let resume;
  if (req.file) {
    resume = req.file.filename;
    req.body.resume = resume;
  }

  const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      candidate,
    },
  });
});

exports.deleteCandidate = catchAsync(async (req, res, next) => {
  await Candidate.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
