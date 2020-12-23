const express = require('express');
const candidateController = require('../controller/candidate-controller');

const router = express.Router();

router.post(
  '/createCandidate',
  candidateController.uploadCandidateResume,
  candidateController.createCandidate
);

router.patch(
  '/editCandidate/:id',
  candidateController.uploadCandidateResume,
  candidateController.editCandidate
);

router.delete('/deleteCandidate/:id', candidateController.deleteCandidate);

module.exports = router;
