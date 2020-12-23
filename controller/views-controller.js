const Candidate = require('../models/Candidate');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getMainPage = catchAsync(async (req, res) => {
  res.status(200).render('main', {
    title: 'Candidates List',
  });
});

exports.applyForJob = catchAsync(async (req, res) => {
  res.status(200).render('job-apply', {
    title: 'Apply for Job',
  });
});

exports.getAllCandidates = catchAsync(async (req, res) => {
  const candidates = await Candidate.find();

  res.status(200).render('candidates-list', {
    title: 'All Candidates',
    candidates,
  });
});

exports.getCandidate = catchAsync(async (req, res, next) => {
  const candidate = await Candidate.findOne({ token: req.params.token });

  if (!candidate) {
    return next(new AppError('There is no candidate with that token', 404));
  }

  res.status(200).render('candidate', {
    title: `${candidate.name}`,
    candidate,
  });
});

exports.deleteCandidate = catchAsync(async (req, res, next) => {
  const candidate = await Candidate.findOne({ token: req.params.token });

  if (!candidate) {
    return next(new AppError('There is no candidate with that token', 404));
  }

  res.status(200).render('delete-candidate', {
    title: `${candidate.name}`,
    candidate,
  });
});
