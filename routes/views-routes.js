const express = require('express');
const viewsController = require('../controller/views-controller');

const router = express.Router();

router.get('/', viewsController.getMainPage);

router.get('/getAllCandidates', viewsController.getAllCandidates);

router.get('/getCandidate/:token', viewsController.getCandidate);

router.get('/deleteCandidate/:token', viewsController.deleteCandidate);

router.get('/apply', viewsController.applyForJob);

module.exports = router;
