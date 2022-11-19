const express = require('express');
const router = express.Router();
const recruiterControllers = require('../controllers/recruiter');
const upload = require('../middlewares/upload');

router.get ('/getOpenPositions', recruiterControllers.getOpenPositions);
router.put ('/claimPosition/:jobId/:userId', recruiterControllers.claimPosition);
router.get ('/getClaimedPositions/:userId', recruiterControllers.getClaimedPositions);
// router.post ('/addCandidate/:jobId/:recruiterId',upload.fields([{name: 'resume', maxCount:1},{name: 'additionalFiles', maxCount: 5}]),recruiterControllers.addCandidate);
router.post ('/addCandidate',upload.fields([{name: 'resume', maxCount:1},{name: 'additionalFiles', maxCount: 5}]),recruiterControllers.addCandidate);

module.exports = router;